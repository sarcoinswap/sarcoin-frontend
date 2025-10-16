import { Currency } from '@sarcoinswap/sdk'
import { FeeAmount, Pool, TICK_SPACINGS, nearestUsableTick, tickToPrice } from '@sarcoinswap/v3-sdk'
import { NonEVMChainId } from '@sarcoinswap/chains'
import { useActiveChainId } from 'hooks/useAccountActiveChain'
import { useClmmAmmConfigs } from 'hooks/solana/useClmmAmmConfigs'
import { useCallback, useMemo } from 'react'
import { setFullRange } from 'views/AddLiquidityV3/formViews/V3FormView/form/actions'
import { useV3FormDispatch } from '../reducer'

export function useRangeHopCallbacks(
  baseCurrency: Currency | undefined,
  quoteCurrency: Currency | undefined,
  feeAmount: FeeAmount | undefined,
  tickLower: number | undefined,
  tickUpper: number | undefined,
  pool?: Pool | undefined | null,
) {
  const dispatch = useV3FormDispatch()
  const { chainId } = useActiveChainId()
  const ammConfigs = useClmmAmmConfigs()

  const baseToken = useMemo(() => baseCurrency?.wrapped, [baseCurrency])
  const quoteToken = useMemo(() => quoteCurrency?.wrapped, [quoteCurrency])

  const solanaTickSpacing = useMemo(() => {
    if (chainId !== NonEVMChainId.SOLANA || !feeAmount) return undefined
    return Object.values(ammConfigs).find((c) => c.tradeFeeRate === Number(feeAmount))?.tickSpacing ?? undefined
  }, [ammConfigs, chainId, feeAmount])

  const effectiveTickSpacing = useMemo(() => {
    if (chainId === NonEVMChainId.SOLANA) return solanaTickSpacing
    return feeAmount ? TICK_SPACINGS[feeAmount] : undefined
  }, [chainId, solanaTickSpacing, feeAmount])

  const getDecrementLower = useCallback(() => {
    if (baseToken && quoteToken && typeof tickLower === 'number' && effectiveTickSpacing !== undefined) {
      return tickToPrice(
        baseToken,
        quoteToken,
        nearestUsableTick(tickLower - effectiveTickSpacing, effectiveTickSpacing),
      )
    }
    // use pool current tick as starting tick if we have pool but no tick input
    if (!(typeof tickLower === 'number') && baseToken && quoteToken && effectiveTickSpacing !== undefined && pool) {
      return tickToPrice(
        baseToken,
        quoteToken,
        nearestUsableTick(pool.tickCurrent - effectiveTickSpacing, effectiveTickSpacing),
      )
    }
    return undefined
  }, [baseToken, quoteToken, tickLower, effectiveTickSpacing, pool])

  const getIncrementLower = useCallback(() => {
    if (baseToken && quoteToken && typeof tickLower === 'number' && effectiveTickSpacing !== undefined) {
      return tickToPrice(
        baseToken,
        quoteToken,
        nearestUsableTick(tickLower + effectiveTickSpacing, effectiveTickSpacing),
      )
    }
    // use pool current tick as starting tick if we have pool but no tick input
    if (!(typeof tickLower === 'number') && baseToken && quoteToken && effectiveTickSpacing !== undefined && pool) {
      return tickToPrice(
        baseToken,
        quoteToken,
        nearestUsableTick(pool.tickCurrent + effectiveTickSpacing, effectiveTickSpacing),
      )
    }
    return undefined
  }, [baseToken, quoteToken, tickLower, effectiveTickSpacing, pool])

  const getDecrementUpper = useCallback(() => {
    if (baseToken && quoteToken && typeof tickUpper === 'number' && effectiveTickSpacing !== undefined) {
      return tickToPrice(
        baseToken,
        quoteToken,
        nearestUsableTick(tickUpper - effectiveTickSpacing, effectiveTickSpacing),
      )
    }
    // use pool current tick as starting tick if we have pool but no tick input
    if (!(typeof tickUpper === 'number') && baseToken && quoteToken && effectiveTickSpacing !== undefined && pool) {
      return tickToPrice(
        baseToken,
        quoteToken,
        nearestUsableTick(pool.tickCurrent - effectiveTickSpacing, effectiveTickSpacing),
      )
    }
    return undefined
  }, [baseToken, quoteToken, tickUpper, effectiveTickSpacing, pool])

  const getIncrementUpper = useCallback(() => {
    if (baseToken && quoteToken && typeof tickUpper === 'number' && effectiveTickSpacing !== undefined) {
      return tickToPrice(
        baseToken,
        quoteToken,
        nearestUsableTick(tickUpper + effectiveTickSpacing, effectiveTickSpacing),
      )
    }
    // use pool current tick as starting tick if we have pool but no tick input
    if (!(typeof tickUpper === 'number') && baseToken && quoteToken && effectiveTickSpacing !== undefined && pool) {
      return tickToPrice(
        baseToken,
        quoteToken,
        nearestUsableTick(pool.tickCurrent + effectiveTickSpacing, effectiveTickSpacing),
      )
    }
    return undefined
  }, [baseToken, quoteToken, tickUpper, effectiveTickSpacing, pool])

  const getSetFullRange = useCallback(() => {
    dispatch(setFullRange())
  }, [dispatch])

  return { getDecrementLower, getIncrementLower, getDecrementUpper, getIncrementUpper, getSetFullRange }
}
