import { Fraction, UnifiedCurrency, UnifiedCurrencyAmount } from '@sarcoinswap/sdk'
import { formatAmount } from '@sarcoinswap/utils/formatFractions'

const CURRENCY_AMOUNT_MIN = new Fraction(1n, 1000000n)

interface FormatterCurrencyAmountProps {
  currencyAmount?: UnifiedCurrencyAmount<UnifiedCurrency>
  significantDigits?: number
}

export function formattedCurrencyAmount({ currencyAmount, significantDigits = 4 }: FormatterCurrencyAmountProps) {
  const formattedAmount = formatAmount(currencyAmount, significantDigits)
  return !formattedAmount || !currencyAmount || currencyAmount.equalTo(0n)
    ? '0'
    : currencyAmount.greaterThan(CURRENCY_AMOUNT_MIN)
    ? new Intl.NumberFormat(undefined, {
        maximumSignificantDigits: significantDigits,
      }).format(Number(formattedAmount))
    : `<${CURRENCY_AMOUNT_MIN.toSignificant(1)}`
}

export default function FormattedCurrencyAmount(props: FormatterCurrencyAmountProps) {
  return <>{formattedCurrencyAmount(props)}</>
}
