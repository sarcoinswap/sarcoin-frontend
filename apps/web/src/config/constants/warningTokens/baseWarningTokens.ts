import { ChainId } from '@sarcoinswap/chains'
import { ERC20Token } from '@sarcoinswap/sdk'

export const baseWarningTokens = {
  ath: new ERC20Token(ChainId.BASE, '0xd9DC8D2B0497C38999dd743A6aDdBe4e83DE8aF6', 18, 'ATH', 'Aethir Token', ''),
}
