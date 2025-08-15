import { useDebounce } from '@orbs-network/twap-ui/dist/hooks'
import { TradeType } from '@pancakeswap/swap-sdk-core'
import tryParseAmount from '@pancakeswap/utils/tryParseAmount'
import { useUnifiedCurrency } from 'hooks/Tokens'
import { useInputBasedAutoSlippageWithFallback } from 'hooks/useAutoSlippageWithFallback'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { activeQuoteHashAtom } from 'quoter/atom/abortControlAtoms'
import { bestCrossChainQuoteAtom } from 'quoter/atom/bestCrossChainAtom'
import { baseAllTypeBestTradeAtom, pauseAtom, userTypingAtom } from 'quoter/atom/bestTradeUISyncAtom'
import { updatePlaceholderAtom } from 'quoter/atom/placeholderAtom'
import { QUOTE_FAIL_REVALIDATE, QUOTE_SUCC_REVALIDATE } from 'quoter/consts'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useCurrentBlock } from 'state/block/hooks'
import { Field } from 'state/swap/actions'
import { useSwapState } from 'state/swap/hooks'
import useAccountActiveChain from 'hooks/useAccountActiveChain'
import { NonEVMChainId } from '@pancakeswap/chains'
import { QuoteQuery, SVMQuoteQuery } from 'quoter/quoter.types'

import { quoteNonceAtom } from '../atom/revalidateAtom'
import { createQuoteQuery } from '../utils/createQuoteQuery'
import { useQuoteContext } from './QuoteContext'
import { multicallGasLimitAtom } from './useMulticallGasLimit'

export const useQuoterSync = () => {
  const swapState = useSwapState()
  const debouncedSwapState = useDebounce(swapState, 300)
  const {
    independentField,
    typedValue,
    [Field.INPUT]: { currencyId: inputCurrencyId, chainId: inputCurrencyChainId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId, chainId: outputCurrencyChainId },
  } = debouncedSwapState
  const { account: address, solanaAccount, chainId: currentChain } = useAccountActiveChain()
  const inputCurrency = useUnifiedCurrency(inputCurrencyId, inputCurrencyChainId)
  const outputCurrency = useUnifiedCurrency(outputCurrencyId, outputCurrencyChainId)
  const isExactIn = independentField === Field.INPUT
  const independentCurrency = isExactIn ? inputCurrency : outputCurrency
  const dependentCurrency = isExactIn ? outputCurrency : inputCurrency
  const tradeType = isExactIn ? TradeType.EXACT_INPUT : TradeType.EXACT_OUTPUT
  const amount = tryParseAmount(typedValue, independentCurrency ?? undefined)

  const {
    singleHopOnly,
    split,
    v2Swap,
    v3Swap,
    infinitySwap,
    stableSwap,
    maxHops,
    chainId,
    speedQuoteEnabled,
    xEnabled,
  } = useQuoteContext()
  const setTrade = useSetAtom(baseAllTypeBestTradeAtom)
  const setTyping = useSetAtom(userTypingAtom)
  const [paused, pauseQuote] = useAtom(pauseAtom)

  const { slippageTolerance: slippage, isAuto } = useInputBasedAutoSlippageWithFallback(amount)
  const blockNumber = useCurrentBlock()
  const destinationBlockNumber = useCurrentBlock(outputCurrencyChainId)
  const setActiveQuoteHash = useSetAtom(activeQuoteHashAtom)
  const [nonce, setNonce] = useAtom(quoteNonceAtom)
  const gasLimit = useAtomValue(multicallGasLimitAtom(chainId))
  const gasLimitDestinationChain = useAtomValue(multicallGasLimitAtom(outputCurrencyChainId))

  const quoteQueryInit = {
    amount,
    currency: dependentCurrency,
    baseCurrency: independentCurrency,
    tradeType,
    maxHops: singleHopOnly ? 1 : maxHops,
    maxSplits: split ? undefined : 0,
    v2Swap,
    v3Swap,
    infinitySwap: Boolean(infinitySwap), // chain support is check inner
    stableSwap,
    speedQuoteEnabled,
    xEnabled,
    slippage,
    isAutoSlippage: isAuto,
    address: currentChain === NonEVMChainId.SOLANA ? solanaAccount : address,
    blockNumber,
    destinationBlockNumber,
    gasLimitDestinationChain,
    nonce,
    for: 'main',
    gasLimit,
  } as QuoteQuery | SVMQuoteQuery

  // const isCrossChain = inputCurrencyChainId !== outputCurrencyChainId

  const quoteQuery = createQuoteQuery(quoteQueryInit)
  const setPlaceholder = useSetAtom(updatePlaceholderAtom)
  const { t, schedule, clear } = useTimer(1000)

  useEffect(() => {
    setActiveQuoteHash(quoteQuery.hash)
  }, [quoteQuery.hash, setActiveQuoteHash])

  useEffect(() => {
    clear()
  }, [quoteQuery.placeholderHash])

  useEffect(() => {
    setTyping(true)
  }, [typedValue, setTyping])

  const quoteResult = useAtomValue(bestCrossChainQuoteAtom(quoteQuery))

  useEffect(() => {
    if (t > 0 && !paused) {
      if (quoteResult.isJust() && !quoteResult.hasFlag('placeholder')) {
        schedule(t + QUOTE_SUCC_REVALIDATE, () => {
          setNonce((v) => v + 1)
        })
        return
      }

      if (quoteResult.isFail()) {
        schedule(t + QUOTE_FAIL_REVALIDATE, () => {
          setNonce((v) => v + 1)
        })
      }
    }
  }, [t, quoteResult, paused, schedule])

  useEffect(() => {
    if (quoteResult.isJust() && !quoteResult.hasFlag('placeholder')) {
      // NOTE: placeholderHash is used to show previous quote when new quote is pending
      const placeholderHash = quoteResult.getExtra('placeholderHash') as string
      setPlaceholder(placeholderHash, quoteResult.unwrap())
    }

    if (paused) {
      return
    }

    const order = quoteResult.unwrapOr(undefined)

    setTrade({
      bestOrder: order,
      tradeLoaded: !quoteResult.isPending(),
      tradeError: quoteResult.error,
      refreshDisabled: false,
      refreshOrder: () => {
        setNonce((v) => v + 1)
      },
      refreshTrade: () => {
        setNonce((v) => v + 1)
      },
      pauseQuoting: () => {
        pauseQuote(true)
      },
      resumeQuoting: () => {
        pauseQuote(false)
      },
    })
    setTyping(false)
  }, [
    quoteResult.value,
    quoteResult.loading,
    quoteResult.error,
    pauseQuote,
    setTrade,
    setTyping,
    setNonce,
    paused,
    setPlaceholder,
    quoteResult,
  ])
}

interface Task {
  t: number
  fn: () => void
}
const useTimer = (interval: number) => {
  const [count, setCount] = useState(0)
  const tasks = useRef<Task[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev + 1)
    }, interval)

    return () => clearInterval(timer)
  }, [interval, setCount])

  useEffect(() => {
    for (const task of tasks.current) {
      if (task.t <= count) {
        task.fn()
        tasks.current = tasks.current.filter((t) => t !== task)
      }
    }
  }, [count])

  const scheduleFn = useCallback((t: number, fn: () => void) => {
    if (tasks.current.length === 0) {
      tasks.current.push({ t, fn })
    }
  }, [])

  const clear = useCallback(() => {
    tasks.current = []
  }, [])

  return {
    t: count,
    schedule: scheduleFn,
    clear,
  }
}
