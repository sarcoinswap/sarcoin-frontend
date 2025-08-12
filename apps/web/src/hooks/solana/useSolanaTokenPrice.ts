import { useMemo } from 'react'
import { useAtomValue } from 'jotai'
import { atomFamily } from 'jotai/utils'
import { atomWithLoadable } from 'quoter/atom/atomWithLoadable'
import { isEqual } from 'utils/hash'

import { PublicKey } from '@solana/web3.js'

const WALLET_PRICE_URL = 'https://wallet-api.pancakeswap.com/sol/v1/prices/list'

type PriceReturnType = { [key: string]: number }

interface SolanaTokenPriceParams {
  mint?: string
  enabled: boolean
  version: number
}

const solanaTokenPriceAtom = atomFamily((params: SolanaTokenPriceParams) => {
  return atomWithLoadable(async () => {
    const { mint, enabled } = params
    if (!enabled || !mint) {
      return undefined
    }
    const response = await fetch(`${WALLET_PRICE_URL}/${mint}`)
    if (!response.ok) {
      throw new Error('Failed to fetch price')
    }
    const resp: PriceReturnType = await response.json()
    const result = Object.entries(resp).reduce((acc, [key, val]) => {
      // eslint-disable-next-line no-param-reassign
      acc[key.split('-')[1] ?? key] = val
      return acc
    }, {} as PriceReturnType)
    return result
  })
}, isEqual)

export const useSolanaTokenPrice = (props: {
  mint: string | undefined
  refreshInterval?: number
  timeout?: number
  enabled?: boolean
}) => {
  const { mint, refreshInterval = 2 * 60 * 1000, enabled = true } = props || {}
  const version = Math.floor(Date.now() / refreshInterval)

  const loadable = useAtomValue(solanaTokenPriceAtom({ mint, enabled, version }))

  const data = loadable.unwrapOr({})
  const error = loadable.isFail() ? loadable.error : undefined
  const isLoading = loadable.isPending()
  const isEmptyResult = loadable.isNothing()

  return {
    data: mint ? data[mint?.toLowerCase()] : undefined,
    isLoading,
    error,
    isEmptyResult,
  }
}

export const useSolanaTokenPrices = (props: {
  mints: (string | PublicKey | undefined)[]
  refreshInterval?: number
  timeout?: number
  enabled?: boolean
}) => {
  const { mints, refreshInterval = 2 * 60 * 1000, enabled = true } = props || {}
  const readyList = useMemo(() => Array.from(new Set(mints.filter((m): m is string => !!m))).join(','), [mints])
  const version = Math.floor(Date.now() / refreshInterval)

  const loadable = useAtomValue(
    solanaTokenPriceAtom({ mint: readyList || undefined, enabled: enabled && readyList.length > 0, version }),
  )

  const data = loadable.unwrapOr({})
  const error = loadable.isFail() ? loadable.error : undefined
  const isLoading = loadable.isPending()
  const isEmptyResult = loadable.isNothing()

  return useMemo(
    () => ({
      data,
      isLoading,
      error,
      isEmptyResult,
    }),
    [data, isLoading, error, isEmptyResult],
  )
}
