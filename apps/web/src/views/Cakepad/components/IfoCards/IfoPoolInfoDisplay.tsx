import { Trans, useTranslation } from '@pancakeswap/localization'
import { FlexGap, InfoIcon, Link, Text, useTooltip } from '@pancakeswap/uikit'
import { ReactNode } from 'react'
import { styled } from 'styled-components'
import { NumberDisplay } from '@pancakeswap/widgets-internal'
import type { IFOStatus } from '../../hooks/ifo/useIFOStatus'
import useIfo from '../../hooks/useIfo'
import { useIfoDisplay } from '../../hooks/useIfoDisplay'

const StyledText = styled(Text)`
  font-size: 14px;
  font-family: Kanit;
  line-height: 150%;
`

type InfoRowData = { left: ReactNode; right: ReactNode; display: boolean }

const InfoRow: React.FC<InfoRowData & { mt?: string }> = ({ left, right, display, mt }) =>
  display ? (
    <FlexGap justifyContent="space-between" mt={mt}>
      {left}
      {right}
    </FlexGap>
  ) : null

interface IfoPoolInfoDisplayProps {
  pid: number
  ifoStatus?: IFOStatus
  variant: 'live' | 'finished' | 'presale' | 'history'
}

const splitValueAndSuffix = (value?: string) => {
  if (!value) return { numeric: undefined, suffix: undefined }

  const [numeric, ...rest] = value.trim().split(/\s+/)
  if (!numeric) return { numeric: undefined, suffix: undefined }

  return {
    numeric,
    suffix: rest.length ? ` ${rest.join(' ')}` : undefined,
  }
}

const IfoPoolInfoDisplay: React.FC<IfoPoolInfoDisplayProps> = ({ pid, ifoStatus, variant }) => {
  const { t } = useTranslation()
  const { pools, users } = useIfo()
  const poolInfo = pools?.[pid]
  const userStatus = users[pid]
  const stakeCurrency = poolInfo?.stakeCurrency
  const { pools: displayPools } = useIfoDisplay()
  const raiseAmountText = displayPools?.[pid]?.raiseAmountText
  const pricePerToken = poolInfo?.price
  const userHasStaked = userStatus?.stakedAmount?.greaterThan(0)
  const showExtraInfo = variant === 'live' && userHasStaked
  const feeTier = poolInfo?.feeTier !== undefined ? `${(poolInfo.feeTier * 100).toFixed(2)}%` : undefined
  const taxValue = poolInfo?.isCakePool && userStatus?.tax ? userStatus.tax.toFixed(6) : undefined
  const taxSymbol = userStatus?.tax?.currency?.symbol
  const taxSuffix = poolInfo?.isCakePool && userStatus?.tax && taxSymbol ? ` ${taxSymbol}` : undefined
  const cakeToBurnValue =
    poolInfo?.isCakePool && poolInfo?.estimatedCakeToBurn ? poolInfo.estimatedCakeToBurn.toSignificant(6) : undefined
  const cakeToBurnSymbol = poolInfo?.estimatedCakeToBurn?.currency?.symbol
  const cakeToBurnSuffix =
    poolInfo?.isCakePool && poolInfo?.estimatedCakeToBurn && cakeToBurnSymbol ? ` ${cakeToBurnSymbol}` : undefined
  const { numeric: raiseAmountValue, suffix: raiseAmountSuffix } = splitValueAndSuffix(raiseAmountText)
  const commonNumberDisplayProps = {
    color: 'text' as const,
    fontSize: '14px',
    fontFamily: 'Kanit',
    lineHeight: '150%',
  }

  const {
    targetRef: statusTargetRef,
    tooltip: statusTooltip,
    tooltipVisible: statusTooltipVisible,
  } = useTooltip(t('This sale has been oversubscribed. You will get partial refund of the deposit.'), {
    placement: 'top',
  })

  const feeTierTooltipContent = (
    <Text as="div" fontSize="12px">
      <Trans>
        Tiered Tax based on subscription % : Fees decrease as oversubscription increases.
        <ul>
          <li>≤100% Sub → 0% Fee</li>
          <li>&gt;100% Sub → 1% Fee</li>
          <li>≥5,000% Sub → 0.8% Fee</li>
          <li>≥10,000% Sub → 0.6% Fee</li>
          <li>≥15,000% Sub → 0.5% Fee</li>
          <li>≥20,000% Sub → 0.4% Fee</li>
          <li>≥25,000% Sub → 0.3% Fee</li>
          <li>≥30,000% Sub → 0.25% Fee</li>
          <li>≥40,000% Sub → 0.20% Fee</li>
          <li>≥50,000% Sub → 0.15% Fee</li>
          <li>≥65,000% Sub → 0.12% Fee</li>
          <li>≥80,000% Sub → 0.10% Fee</li>
          <li>&gt;150,000% Sub → 0.05% Fee</li>
        </ul>
        (All CAKE.PAD fees collected will be used in CAKE burn)
      </Trans>
    </Text>
  )

  const {
    targetRef: feeTierTargetRef,
    tooltip: feeTierTooltip,
    tooltipVisible: feeTierTooltipVisible,
  } = useTooltip(feeTierTooltipContent, {
    placement: 'top-start',
  })

  const taxTooltipContent = (
    <Text as="div" fontSize="12px">
      {t(
        'Taxes apply only if the CAKE.PAD event is oversubscribed. Tax is deducted solely from your excess committed funds (based on fee tier).',
      )}
      <br />
      <Link
        href="https://docs.pancakeswap.finance/earn/cakepad/how-cake.pad-taxes-work-in-overflow-sales-with-example"
        target="_blank"
      >
        {t('Learn More')}
      </Link>
    </Text>
  )

  const {
    targetRef: taxTargetRef,
    tooltip: taxTooltip,
    tooltipVisible: taxTooltipVisible,
  } = useTooltip(taxTooltipContent, {
    placement: 'top-start',
  })

  const feeTierRight = (
    <FlexGap ref={feeTierTargetRef} alignItems="center">
      <StyledText color="text">{feeTier}</StyledText>
      <InfoIcon width="14px" color="textSubtle" />
      {feeTierTooltipVisible && feeTierTooltip}
    </FlexGap>
  )

  const statusRight = (
    <FlexGap flexDirection="column" alignItems="flex-end">
      <FlexGap gap="3px" alignItems="center">
        <NumberDisplay
          {...commonNumberDisplayProps}
          value={ifoStatus?.progress ? ifoStatus.progress.toFixed(2) : '0.00'}
          suffix=" %"
        />
        {ifoStatus?.progress?.greaterThan(1) && (
          <StyledText as="span" color="text">
            🎉
          </StyledText>
        )}
        {ifoStatus?.progress?.greaterThan(1) && variant === 'finished' && (
          <FlexGap ref={statusTargetRef}>
            <InfoIcon width="14px" color="textSubtle" />
            {statusTooltipVisible && statusTooltip}
          </FlexGap>
        )}
      </FlexGap>
      {ifoStatus?.progress?.greaterThan(1) && variant !== 'finished' && (
        <FlexGap gap="3px">
          <StyledText color="text">{t('Oversubscribed')}</StyledText>
          <FlexGap ref={statusTargetRef}>
            <InfoIcon width="14px" color="textSubtle" />
            {statusTooltipVisible && statusTooltip}
          </FlexGap>
        </FlexGap>
      )}
    </FlexGap>
  )

  const list: InfoRowData[] = [
    {
      left: <StyledText color="textSubtle">{t('Sale Price per token')}</StyledText>,
      right: pricePerToken ? (
        <NumberDisplay
          {...commonNumberDisplayProps}
          value={pricePerToken.toFixed(6)}
          suffix={stakeCurrency?.symbol ? ` ${stakeCurrency.symbol}` : undefined}
        />
      ) : (
        <StyledText color="text">-</StyledText>
      ),
      display: true,
    },
    {
      left: <StyledText color="textSubtle">{t('Raise Goal')}</StyledText>,
      right: raiseAmountValue ? (
        <NumberDisplay
          {...commonNumberDisplayProps}
          value={raiseAmountValue}
          suffix={raiseAmountSuffix}
          maximumSignificantDigits={6}
        />
      ) : (
        <StyledText color="text">{raiseAmountText ?? '-'}</StyledText>
      ),
      display: true,
    },
    {
      left: <StyledText color="textSubtle">{t('Total committed')}</StyledText>,
      right: (
        <NumberDisplay
          {...commonNumberDisplayProps}
          value={ifoStatus?.currentStakedAmount?.toSignificant(6) ?? '0'}
          suffix={stakeCurrency?.symbol ? ` ${stakeCurrency.symbol}` : undefined}
          maximumSignificantDigits={12}
        />
      ),
      display: variant !== 'presale',
    },
    {
      left: <StyledText color="textSubtle">{t('Deposit Amount')}</StyledText>,
      right: (
        <NumberDisplay
          {...commonNumberDisplayProps}
          value={userStatus?.stakedAmount?.toSignificant(6) ?? '0'}
          suffix={stakeCurrency?.symbol ? ` ${stakeCurrency.symbol}` : undefined}
          maximumSignificantDigits={6}
        />
      ),
      display: Boolean(variant !== 'presale' && showExtraInfo),
    },
    {
      left: <StyledText color="textSubtle">{t('Fee Tier')}</StyledText>,
      right: feeTierRight,
      display: variant !== 'presale' && variant !== 'finished' && !showExtraInfo && !!feeTier,
    },
    {
      left: <StyledText color="textSubtle">{t('Status')}</StyledText>,
      right: statusRight,
      display: variant !== 'presale' && variant !== 'history',
    },
    {
      left: <StyledText color="textSubtle">{t('Fee Tier')}</StyledText>,
      right: feeTierRight,
      display: Boolean(variant !== 'presale' && showExtraInfo && !!feeTier),
    },
    {
      left: <StyledText color="textSubtle">{t('Your Tax')}</StyledText>,
      right: (
        <FlexGap ref={taxTargetRef} alignItems="center">
          {taxValue ? (
            <NumberDisplay {...commonNumberDisplayProps} value={taxValue} suffix={taxSuffix} />
          ) : (
            <StyledText color="text">-</StyledText>
          )}
          <InfoIcon width="14px" color="textSubtle" />
          {taxTooltipVisible && taxTooltip}
        </FlexGap>
      ),
      display: Boolean(variant !== 'presale' && showExtraInfo && !!taxValue),
    },
    {
      left: <StyledText color="textSubtle">{t('Total CAKE to burn')}</StyledText>,
      right: cakeToBurnValue ? (
        <NumberDisplay
          {...commonNumberDisplayProps}
          value={cakeToBurnValue}
          suffix={cakeToBurnSuffix}
          maximumSignificantDigits={6}
        />
      ) : (
        <StyledText color="text">-</StyledText>
      ),
      display: Boolean(variant !== 'presale' && !!cakeToBurnValue),
    },
  ]

  return (
    <>
      {list.map((row, idx) => (
        <InfoRow key={idx} {...row} mt={idx === 0 ? '8px' : undefined} />
      ))}
    </>
  )
}

export default IfoPoolInfoDisplay
