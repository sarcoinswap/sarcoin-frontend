import { Token, WNATIVE } from '@sarcoinswap/sdk'
import { ChainId } from '@sarcoinswap/chains'

export function getNativeWrappedToken(chainId: ChainId): Token | null {
  return WNATIVE[chainId] ?? null
}
