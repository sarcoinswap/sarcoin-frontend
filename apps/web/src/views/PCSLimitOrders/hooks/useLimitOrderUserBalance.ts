import { useAccountActiveChain } from 'hooks/useAccountActiveChain'
import { useAtomValue } from 'jotai'
import { useCallback, useMemo } from 'react'
import { useCurrencyBalances } from 'state/wallet/hooks'
import { BigNumber as BN } from 'bignumber.js'
import { formatAmount } from '@pancakeswap/utils/formatFractions'
import { parseUnits } from '@pancakeswap/utils/viem/parseUnits'
import { Rounding } from '@pancakeswap/swap-sdk-core'
import { useCurrencyUsdPrice } from 'hooks/useCurrencyUsdPrice'
import { useUnifiedUSDPriceAmount } from 'hooks/useStablecoinPrice'
import { useRouter } from 'next/router'
import { formattedAmountsAtom } from '../state/form/inputAtoms'
import { Field } from '../types/limitOrder.types'
import { inputCurrencyAtom, outputCurrencyAtom } from '../state/currency/currencyAtoms'
import { MIN_USD_VALUE } from '../constants'

/**
 * Check token balance for Limit Order
 */
export const useLimitOrderUserBalance = () => {
  const router = useRouter()
  const { account } = useAccountActiveChain()
  const inputCurrency = useAtomValue(inputCurrencyAtom)
  const outputCurrency = useAtomValue(outputCurrencyAtom)
  const formattedAmounts = useAtomValue(formattedAmountsAtom)

  const [inputBalance] = useCurrencyBalances(account, [inputCurrency ?? undefined])
  const [outputBalance] = useCurrencyBalances(account, [outputCurrency ?? undefined])

  const amountUSD = useUnifiedUSDPriceAmount(
    inputCurrency ?? undefined,
    BN(formattedAmounts[Field.CURRENCY_A]).toNumber(),
  )
  // const showMinimumUSDWarning = amountUSD && router.query.disableWarnings !== 'true' ? amountUSD < MIN_USD_VALUE : false

  const showMinimumBNBWarning =
    inputCurrency?.isNative &&
    !!formattedAmounts[Field.CURRENCY_A] &&
    BN(formattedAmounts[Field.CURRENCY_A] || '0').lt(BN(0.05))
  const showMinimumUSDWarning =
    // As a fallback, set minimum native currency required to 0.05 BNB (only release on BSC)
    showMinimumBNBWarning ||
    // Main check
    (amountUSD && router.query.disableWarnings !== 'true' ? amountUSD < MIN_USD_VALUE : false)

  const maxInputBalance = useMemo(() => {
    return inputBalance?.toFixed(6, undefined, Rounding.ROUND_DOWN)
  }, [inputBalance])
  const maxOutputBalance = useMemo(() => {
    return outputBalance?.toFixed(6, undefined, Rounding.ROUND_DOWN)
  }, [outputBalance])

  const isEnoughBalance = useMemo(() => {
    if (!inputBalance) return false
    const inputBalanceAmount = formatAmount(inputBalance, inputCurrency?.decimals)
    if (!inputBalanceAmount) return false

    const requiredAmount = BN(formattedAmounts[Field.CURRENCY_A])

    return BN(inputBalanceAmount).gte(requiredAmount)
  }, [inputBalance, formattedAmounts, inputCurrency])

  const getPercentInputCurrency = useCallback(
    (percent: number) => {
      return inputBalance?.multiply(percent).divide(100).toFixed(6, undefined, Rounding.ROUND_DOWN)
    },
    [inputBalance],
  )

  const getPercentOutputCurrency = useCallback(
    (percent: number) => {
      return outputBalance?.multiply(percent).divide(100).toFixed(6, undefined, Rounding.ROUND_DOWN)
    },
    [outputBalance],
  )

  return {
    inputBalance,
    outputBalance,
    isEnoughBalance,
    maxInputBalance,
    maxOutputBalance,
    showMinimumBNBWarning,
    showMinimumUSDWarning,
    getPercentInputCurrency,
    getPercentOutputCurrency,
  }
}
