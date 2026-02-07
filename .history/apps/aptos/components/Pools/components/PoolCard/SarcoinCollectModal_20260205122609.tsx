import { useQueryClient } from '@pancakeswap/awgmi'
import { Pool } from '@pancakeswap/widgets-internal'
import useHarvestFarm from 'components/Farms/hooks/useHarvestFarm'
import sarcoinPoolRelatedQueries from 'components/Pools/utils/cakePoolRelatedQueries'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCallback } from 'react'
import CollectModalContainer from './CollectModalContainer'

const SarcoinCollectModal = ({
  earningTokenAddress = '',
  ...rest
}: React.PropsWithChildren<Pool.CollectModalProps>) => {
  const { onReward } = useHarvestFarm(earningTokenAddress)
  const queryClient = useQueryClient()
  const { account } = useActiveWeb3React()

  const onDone = useCallback(() => {
    queryClient.invalidateQueries({
      predicate: sarcoinPoolRelatedQueries(account),
    })
  }, [account, queryClient])

  return <CollectModalContainer {...rest} onDone={onDone} onReward={onReward} />
}

export default SarcoinCollectModal
