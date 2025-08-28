import { useMemo } from 'react'

import useSWR from 'swr'

import { WSOLMint } from '@pancakeswap/solana-core-sdk'
import { PublicKey } from '@solana/web3.js'

export interface BirdEyeTokenPrice {
  value: number
  updateUnixTime: number
  updateHumanTime: string
  priceChange24h: number
}

const BIRDEYE_PRICE_URL = `${process.env.NEXT_PUBLIC_SOLANA_EXPLORE_API_ENDPOINT}/cached/v1/tokens/birdeye/defi/multi_price`

const fetcher = async ([url, mintList]: [string, string]) => {
  const response = await fetch(`${url}?list_address=${mintList}`)
  if (!response.ok) throw new Error('Failed to fetch Birdeye price')
  return response.json()
}

export const useBirdeyeTokenPrice = (props: {
  mintList: (string | PublicKey | undefined)[]
  refreshInterval?: number
  timeout?: number
  enabled?: boolean
}) => {
  const { mintList, refreshInterval = 2 * 60 * 1000, enabled = true } = props || {}

  const readyList = useMemo(
    () => Array.from(new Set(mintList.filter((m) => !!m && typeof m === 'string' && m.length === 44))),
    [JSON.stringify(mintList)],
  )

  const shouldFetch = readyList.length > 0 && enabled

  const { data, isLoading, error, ...rest } = useSWR(
    shouldFetch ? [BIRDEYE_PRICE_URL, readyList.join(',')] : null,
    fetcher,
    {
      refreshInterval,
      dedupingInterval: refreshInterval,
      focusThrottleInterval: refreshInterval,
    },
  )
  const isEmptyResult = !isLoading && !(data && !error)

  if (data?.data && data?.success) {
    data.data[PublicKey.default.toBase58()] = data.data[WSOLMint.toBase58()]
  }

  return {
    data: data?.success ? data?.data : {},
    isLoading,
    error,
    isEmptyResult,
    ...rest,
  }
}
