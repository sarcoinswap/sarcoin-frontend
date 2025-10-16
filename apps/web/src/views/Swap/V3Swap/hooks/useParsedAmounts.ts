import { PriceOrder } from '@sarcoinswap/price-api-sdk'
import { UnifiedCurrency, UnifiedCurrencyAmount } from '@sarcoinswap/sdk'
import tryParseAmount from '@sarcoinswap/utils/tryParseAmount'

import { Field } from 'state/swap/actions'
import { useSwapState } from 'state/swap/hooks'

interface Balances {
  [Field.INPUT]?: UnifiedCurrencyAmount<UnifiedCurrency>
  [Field.OUTPUT]?: UnifiedCurrencyAmount<UnifiedCurrency>
}

export function useParsedAmounts(trade: PriceOrder['trade'] | undefined, balances: Balances, isWrapping: boolean) {
  const { independentField, typedValue } = useSwapState()

  const inputCurrency = balances[Field.INPUT]?.currency
  const outputCurrency = balances[Field.OUTPUT]?.currency

  const isExactIn: boolean = independentField === Field.INPUT
  const independentCurrency = isExactIn ? inputCurrency : outputCurrency
  const parsedAmount = tryParseAmount(typedValue, independentCurrency ?? undefined)

  return isWrapping
    ? {
        [Field.INPUT]: parsedAmount,
        [Field.OUTPUT]: parsedAmount,
      }
    : {
        [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
        [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
      }
}
