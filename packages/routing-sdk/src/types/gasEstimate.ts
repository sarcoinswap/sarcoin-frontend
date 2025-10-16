import type { Currency, CurrencyAmount } from '@sarcoinswap/swap-sdk-core'
import { SerializableCurrencyAmount } from './currency'

export type GasUseEstimate = {
  gasUseEstimate: bigint
  gasUseEstimateBase: CurrencyAmount<Currency>
  gasUseEstimateQuote: CurrencyAmount<Currency>
  inputAmountWithGasAdjusted: CurrencyAmount<Currency>
  outputAmountWithGasAdjusted: CurrencyAmount<Currency>
}

export type SerializableGasUseEstimate = {
  gasUseEstimate: string
  gasUseEstimateBase: SerializableCurrencyAmount
  gasUseEstimateQuote: SerializableCurrencyAmount
  inputAmountWithGasAdjusted: SerializableCurrencyAmount
  outputAmountWithGasAdjusted: SerializableCurrencyAmount
}
