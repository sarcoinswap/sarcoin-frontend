import { WETH9 } from '@sarcoinswap/sdk'
import { ChainId } from '@sarcoinswap/chains'
import { USDC } from './common'

export const scrollSepoliaTokens = {
  weth: WETH9[ChainId.SCROLL_SEPOLIA],
  usdc: USDC[ChainId.SCROLL_SEPOLIA],
}
