import { Protocol } from '@sarcoinswap/farms'
import { useTranslation } from '@sarcoinswap/localization'
import { Dot } from 'views/Notifications/styles'
import { Box, FlexGap, PreTitle, Text, useMatchBreakpoints } from '@sarcoinswap/uikit'
import { getPriceOfCurrency } from '@sarcoinswap/v3-sdk'
import { Card, Liquidity, PricePeriodRangeChart } from '@sarcoinswap/widgets-internal'
import { CLRangeSelector } from 'components/Liquidity/Form/CLRangeSelector'
import { Bound } from 'config/constants/types'
import { useInfinityPoolIdRouteParams } from 'hooks/dynamicRoute/usePoolIdRoute'
import { useCLPriceRange } from 'hooks/infinity/useCLPriceRange'
import { useCLPriceRangeCallback } from 'hooks/infinity/useCLPriceRangeCallback'
import { useCurrencyByPoolId } from 'hooks/infinity/useCurrencyByPoolId'
import { useCallback, useMemo, useState } from 'react'
import { useInverted } from 'state/infinity/shared'
import { useCLDensityChartData } from '../hooks/useDensityChartData'
import { usePool } from '../hooks/usePool'
import { useTicksAtLimit } from '../hooks/useTicksAtLimit'
import { getAxisTicks } from '../utils'
import { useTokenRateData } from './useTokenToTokenRateData'

export const CLPriceRangePanel = () => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const { poolId, chainId } = useInfinityPoolIdRouteParams()
  const { currency0, currency1, baseCurrency, quoteCurrency } = useCurrencyByPoolId({ poolId, chainId })
  const pool = usePool<'CL'>()
  const [inverted] = useInverted()
  const [pricePeriod, setPricePeriod] = useState<Liquidity.PresetRangeItem>(Liquidity.PRESET_RANGE_ITEMS[0])
  const { lowerPrice, upperPrice } = useCLPriceRange(currency0, currency1, pool?.tickSpacing ?? undefined)

  const { isLoading: isChartDataLoading, formattedData } = useCLDensityChartData({
    baseCurrency,
    quoteCurrency,
    poolId,
    chainId,
  })

  const { data: rateData } = useTokenRateData({
    baseCurrency,
    quoteCurrency,
    chainId: currency0?.chainId,
    period: pricePeriod.value,
    protocol: Protocol.InfinityCLAMM,
    poolId,
  })

  const { price, rawPrice } = useMemo(() => {
    if (!pool || !currency0 || !pool.sqrtRatioX96)
      return {
        price: undefined,
        rawPrice: undefined,
      }

    const rawPrice_ = getPriceOfCurrency(
      {
        currency0,
        currency1,
        sqrtRatioX96: pool.sqrtRatioX96,
      },
      currency0,
    )
    return {
      price: parseFloat((inverted ? rawPrice_.invert() : rawPrice_).toFixed(8)),
      rawPrice: rawPrice_,
    }
  }, [currency0, currency1, pool, inverted])

  const { onLowerUserInput, onUpperUserInput, quickAction, handleQuickAction } = useCLPriceRangeCallback(
    baseCurrency,
    quoteCurrency,
    pool?.tickSpacing,
    rawPrice,
  )

  const onChangeBothPrice = useCallback(
    (min: string, max: string) => {
      if (inverted) {
        onUpperUserInput(min)
        onLowerUserInput(max)
      } else {
        onLowerUserInput(min)
        onUpperUserInput(max)
      }
    },
    [inverted, onLowerUserInput, onUpperUserInput],
  )
  const onChangeMinPrice = useCallback(
    (min: string) => {
      if (inverted) {
        onUpperUserInput(min)
      } else {
        onLowerUserInput(min)
      }
    },
    [inverted, onLowerUserInput, onUpperUserInput],
  )
  const onChangeMaxPrice = useCallback(
    (max: string) => {
      if (inverted) {
        onLowerUserInput(max)
      } else {
        onUpperUserInput(max)
      }
    },
    [inverted, onLowerUserInput, onUpperUserInput],
  )

  const ticksAtLimit = useTicksAtLimit(pool?.tickSpacing ?? undefined)

  const zoom = useMemo(() => {
    if (quickAction) {
      return Liquidity.getQuickActionConfigs(pool?.tickSpacing)[quickAction]
    }
    const defaultZoom = Liquidity.getZoomLevelConfigs(pool?.tickSpacing)
    if (ticksAtLimit[Bound.UPPER]) {
      return defaultZoom
    }

    const min = Number(lowerPrice?.divide(rawPrice ?? 1).toSignificant(6) ?? 1)
    const max = Number(upperPrice?.divide(rawPrice ?? 1).toSignificant(6) ?? 1)

    return {
      ...defaultZoom,
      initialMin: min * defaultZoom.initialMin,
      initialMax: max * defaultZoom.initialMax,
    }
  }, [ticksAtLimit, quickAction, pool?.tickSpacing, lowerPrice, rawPrice, upperPrice])

  const axisTicks = useMemo(() => getAxisTicks(pricePeriod.value, isMobile), [pricePeriod.value, isMobile])

  return (
    <>
      <FlexGap gap="8px" justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <PreTitle>{t('Set position range')}</PreTitle>
        <FlexGap gap="8px" alignItems="center" flexWrap="wrap">
          <FlexGap gap="8px" alignItems="center">
            <Dot color="primary" show />
            <Text color="textSubtle" small>
              {t('Current Price')}
            </Text>
          </FlexGap>
          <FlexGap gap="8px" alignItems="center">
            <Dot color="secondary" show />
            <Text color="textSubtle" small>
              {t('Position Range')}
            </Text>
          </FlexGap>
          <FlexGap gap="8px" alignItems="center">
            <Dot color="input" show />
            <Text color="textSubtle" small>
              {t('Liquidity Depth')}
            </Text>
          </FlexGap>
        </FlexGap>
      </FlexGap>
      <Box mt="22px" border="1px solid" borderColor="cardBorder" borderRadius="24px" p="8px 8px 2px">
        <FlexGap
          flexDirection={isMobile ? 'column' : 'row'}
          justifyContent={isMobile ? 'flex-start' : 'space-between'}
          gap="16px"
        >
          <Liquidity.PriceRangeDatePicker onChange={setPricePeriod} value={pricePeriod} />
        </FlexGap>

        <Box mt="16px">
          <PricePeriodRangeChart
            isLoading={isChartDataLoading}
            key={currency0?.wrapped.address}
            zoomLevel={zoom}
            baseCurrency={baseCurrency}
            quoteCurrency={quoteCurrency}
            ticksAtLimit={ticksAtLimit}
            price={price}
            priceLower={lowerPrice}
            priceUpper={upperPrice}
            onBothRangeInput={onChangeBothPrice}
            onMinPriceInput={onChangeMinPrice}
            onMaxPriceInput={onChangeMaxPrice}
            formattedData={formattedData}
            priceHistoryData={rateData}
            axisTicks={axisTicks}
            interactive
          />
        </Box>
      </Box>

      <Box mt="22px" mb="8px">
        <CLRangeSelector
          currentPrice={rawPrice}
          baseCurrency={baseCurrency}
          quoteCurrency={quoteCurrency}
          tickSpacing={pool?.tickSpacing}
          quickAction={quickAction}
          handleQuickAction={handleQuickAction}
        />
      </Box>
    </>
  )
}
