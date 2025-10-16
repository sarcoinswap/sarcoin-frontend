import { ChainId, NonEVMChainId, UnifiedChainId } from '@sarcoinswap/chains'
import { Native, SOL } from '@sarcoinswap/sdk'

export const getUnifiedNativeCurrency = (chainId: UnifiedChainId) => {
  try {
    if (chainId === NonEVMChainId.SOLANA) {
      return SOL
    }
    return Native.onChain(chainId ?? ChainId.BSC)
  } catch (e) {
    return Native.onChain(ChainId.BSC)
  }
}
