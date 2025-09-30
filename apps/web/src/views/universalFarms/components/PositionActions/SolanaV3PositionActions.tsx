import styled from 'styled-components'
import { AddIcon, Button, Flex, IconButton, MinusIcon, useModalV2 } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { SolanaV3PoolInfo } from 'state/farmsV4/state/type'
import { SolanaV3PositionDetail } from 'state/farmsV4/state/accountPositions/type'
import { useCallback, useMemo, useState } from 'react'
import { useHarvestRewardCallback } from 'hooks/solana/useHarvestRewardCallback'
import { useSolanaV3RewardInfoFromSimulation } from 'views/universalFarms/hooks/useSolanaV3RewardInfoFromSimulation'
import SolanaV3RemovePositionModal from '../Modals/solana/SolanaV3RemovePositionModal'
import { StopPropagation } from '../StopPropagation'
import { SolanaV3AddPositionModal } from '../Modals/solana/SolanaV3AddPositionModal'

type ActionPanelProps = {
  removed: boolean
  outOfRange?: boolean
  chainId?: number
  detailMode?: boolean
  poolInfo: SolanaV3PoolInfo | undefined
  position: SolanaV3PositionDetail
}

export const SolanaV3PositionActions: React.FC<ActionPanelProps> = ({ removed, poolInfo, position, detailMode }) => {
  const { t } = useTranslation()

  const removePositionModal = useModalV2()
  const addPositionModal = useModalV2()
  const handleRemovePositionClick = useCallback(() => {
    removePositionModal.onOpen()
  }, [removePositionModal])
  const harvestReward = useHarvestRewardCallback()
  const [sending, setSending] = useState(false)
  const handleHarvest = useCallback(async () => {
    if (!poolInfo) return
    setSending(true)
    await harvestReward({
      params: { poolInfo: poolInfo.rawPool, position },
      onSent: () => setSending(false),
      onFinally: () => setSending(false),
    })
  }, [harvestReward, poolInfo, position])

  const { breakdownRewardInfo } = useSolanaV3RewardInfoFromSimulation({
    poolInfo,
    position,
  })

  const hasRewards = useMemo(() => {
    if (!breakdownRewardInfo) return false

    const hasFarmRewards = breakdownRewardInfo.rewards.some((r) => Number(r.amount) > 0 || Number(r.amountUSD) > 0)

    const hasLpFees =
      (breakdownRewardInfo.fee.A &&
        (Number(breakdownRewardInfo.fee.A.amount) > 0 || Number(breakdownRewardInfo.fee.A.amountUSD) > 0)) ||
      (breakdownRewardInfo.fee.B &&
        (Number(breakdownRewardInfo.fee.B.amount) > 0 || Number(breakdownRewardInfo.fee.B.amountUSD) > 0))

    return hasFarmRewards || hasLpFees
  }, [breakdownRewardInfo])

  if (detailMode && poolInfo && removed)
    return (
      <StopPropagation>
        <ActionPanelContainer>
          <Button variant="primary" onClick={addPositionModal.onOpen}>
            {t('Add')}
          </Button>
        </ActionPanelContainer>
        {hasRewards && (
          <Button variant="primary" id="sol-v3-harvest-btn" isLoading={sending} onClick={handleHarvest}>
            {t('Harvest')}
          </Button>
        )}

        <SolanaV3AddPositionModal
          isOpen={addPositionModal.isOpen}
          onClose={addPositionModal.onDismiss}
          pool={poolInfo}
          position={position}
        />
      </StopPropagation>
    )

  return (
    <StopPropagation>
      <ActionPanelContainer $detailMode={detailMode}>
        {!removed && poolInfo?.rawPool && position ? (
          <>
            <IconButton id="sol-v3-remove-btn" variant="secondary" onClick={handleRemovePositionClick}>
              <MinusIcon color="primary" width="24px" />
            </IconButton>
            {removePositionModal.isOpen && (
              <SolanaV3RemovePositionModal
                isOpen={removePositionModal.isOpen}
                onClose={removePositionModal.onDismiss}
                pool={poolInfo}
                position={position}
              />
            )}
          </>
        ) : null}
        <>
          <IconButton id="sol-v3-add-btn" variant="secondary" onClick={addPositionModal.onOpen}>
            <AddIcon color="primary" width="24px" />
          </IconButton>
          {poolInfo && (
            <SolanaV3AddPositionModal
              isOpen={addPositionModal.isOpen}
              onClose={addPositionModal.onDismiss}
              pool={poolInfo}
              position={position}
            />
          )}
        </>
        {hasRewards && (
          <Button variant="primary" id="sol-v3-harvest-btn" isLoading={sending} onClick={handleHarvest}>
            {t('Harvest')}
          </Button>
        )}
      </ActionPanelContainer>
    </StopPropagation>
  )
}

const ActionPanelContainer = styled(Flex)<{ $detailMode?: boolean }>`
  flex-direction: row;
  gap: 8px;
  height: 48px;

  & button {
    flex: 1;
  }

  ${({ $detailMode }) =>
    $detailMode &&
    `
     #sol-v3-remove-btn, #sol-v3-add-btn {
       width: 48px;
       height: 48px;
       flex: none;
    }
  `}
`
