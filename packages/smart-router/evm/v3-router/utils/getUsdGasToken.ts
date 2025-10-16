import { Token } from '@sarcoinswap/sdk'
import { ChainId } from '@sarcoinswap/chains'

import { usdGasTokensByChain } from '../../constants'

export function getUsdGasToken(chainId: ChainId): Token | null {
  return usdGasTokensByChain[chainId]?.[0] ?? null
}
