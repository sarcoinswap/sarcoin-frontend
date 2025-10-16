import { Button, AutoRenewIcon, Skeleton } from '@sarcoinswap/uikit'
import { Pool } from '@sarcoinswap/widgets-internal'

import { useTranslation } from '@sarcoinswap/localization'
import { useERC20 } from 'hooks/useContract'
import { Token } from '@sarcoinswap/sdk'
import { useApprovePool } from '../../../hooks/useApprove'

interface ApprovalActionProps {
  pool: Pool.DeserializedPool<Token>
  isLoading?: boolean
}

const ApprovalAction: React.FC<React.PropsWithChildren<ApprovalActionProps>> = ({ pool, isLoading = false }) => {
  const { sousId, stakingToken, earningToken } = pool
  const { t } = useTranslation()
  const stakingTokenContract = useERC20(stakingToken.address)
  const { handleApprove, pendingTx } = useApprovePool(stakingTokenContract, sousId, earningToken.symbol)

  return (
    <>
      {isLoading ? (
        <Skeleton width="100%" height="52px" />
      ) : (
        <Button
          isLoading={pendingTx}
          endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
          disabled={pendingTx}
          onClick={handleApprove}
          width="100%"
        >
          {t('Enable.Approval')}
        </Button>
      )}
    </>
  )
}

export default ApprovalAction
