import { BIG_TEN } from '@sarcoinswap/utils/bigNumber'
import memoize from '@sarcoinswap/utils/memoize'
import BN from 'bignumber.js'

export const getFullDecimalMultiplier = memoize((decimals: number): BN => {
  return BIG_TEN.pow(decimals)
})
