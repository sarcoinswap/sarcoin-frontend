import { useTranslation } from '@sarcoinswap/localization'
import { Tag } from '@sarcoinswap/uikit'
import { FeeAmount } from '@sarcoinswap/v3-sdk'
import { PoolState } from 'hooks/v3/types'
import { useFeeTierDistribution } from 'hooks/v3/useFeeTierDistribution'

export function FeeTierPercentageBadge({
  feeAmount,
  distributions,
  poolState,
}: {
  feeAmount: FeeAmount
  distributions: ReturnType<typeof useFeeTierDistribution>['distributions']
  poolState: PoolState
}) {
  const { t } = useTranslation()

  return (
    <Tag
      variant="tertiary"
      fontSize="10px"
      padding="4px 8px"
      style={{
        width: 'fit-content',
        justifyContent: 'center',
        whiteSpace: 'inherit',
        alignSelf: 'flex-end',
        textAlign: 'center',
      }}
    >
      {!distributions || poolState === PoolState.NOT_EXISTS || poolState === PoolState.INVALID
        ? t('Not Created')
        : distributions[feeAmount] !== undefined
        ? `${distributions[feeAmount]?.toFixed(0)}% ${t('Pick')}`
        : t('No Data')}
    </Tag>
  )
}
