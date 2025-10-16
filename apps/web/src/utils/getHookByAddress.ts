import { ChainId } from '@sarcoinswap/chains'
import { HookData, hooksList } from '@sarcoinswap/infinity-sdk'
import keyBy from 'lodash/keyBy'
import memoize from 'lodash/memoize'

export const getHooksMap = memoize((chainId: number) => {
  const list = hooksList[chainId] ?? []
  return keyBy(list, (item) => item.address.toLowerCase())
})

export const getHookByAddress = (chainId?: ChainId, address?: HookData['address']): HookData | undefined => {
  return chainId && address ? getHooksMap(chainId)[address.toLowerCase()] : undefined
}
