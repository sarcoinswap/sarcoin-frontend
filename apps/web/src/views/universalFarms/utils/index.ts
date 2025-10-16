import { chainFullNames, UnifiedChainId } from '@sarcoinswap/chains'

export function getChainFullName(chainId: UnifiedChainId) {
  return chainFullNames[chainId]
}
