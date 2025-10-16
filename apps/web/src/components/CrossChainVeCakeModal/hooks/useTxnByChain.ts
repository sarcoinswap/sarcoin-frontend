import { ChainId } from '@sarcoinswap/chains'
import { IfoChainId } from '@sarcoinswap/widgets-internal/ifo/constants'
import { atom, useAtom } from 'jotai'

const txnByChainAtom = atom<Record<Exclude<IfoChainId, ChainId.BSC>, string>>({
  [ChainId.ARBITRUM_ONE]: '',
  [ChainId.ETHEREUM]: '',
  [ChainId.ZKSYNC]: '',
})

export const useTxnByChain = () => {
  return useAtom(txnByChainAtom)
}
