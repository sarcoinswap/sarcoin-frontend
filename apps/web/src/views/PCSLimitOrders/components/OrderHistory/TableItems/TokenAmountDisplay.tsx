import { Currency } from '@sarcoinswap/sdk'
import { FlexGap } from '@sarcoinswap/uikit'
import { CurrencyLogo, NumberDisplay } from '@sarcoinswap/widgets-internal'

interface TokenAmountDisplayProps {
  currency: Currency
  amount: string
}
export const TokenAmountDisplay = ({ currency, amount }: TokenAmountDisplayProps) => {
  return (
    <FlexGap gap="8px" alignItems="center">
      <CurrencyLogo mt="2px" currency={currency} />
      <NumberDisplay value={amount} maximumSignificantDigits={6} suffix={` ${currency.symbol}`} small bold />
    </FlexGap>
  )
}
