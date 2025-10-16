import { Currency } from '@sarcoinswap/swap-sdk-core'
import { DEFAULT_PAYMASTER_TOKEN } from 'config/paymaster'
import { atom, useAtom } from 'jotai'

export const gasTokenAtom = atom<Currency>(DEFAULT_PAYMASTER_TOKEN)

export const useGasToken = () => {
  return useAtom(gasTokenAtom)
}
