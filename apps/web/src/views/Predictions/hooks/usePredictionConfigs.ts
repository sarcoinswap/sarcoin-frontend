import { getPredictionConfig } from '@sarcoinswap/prediction'
import { useQuery } from '@tanstack/react-query'

import { ChainId } from '@sarcoinswap/chains'
import { useActiveChainId } from 'hooks/useActiveChainId'

export function usePredictionConfigs(pickedChainId?: ChainId) {
  const { chainId } = useActiveChainId()
  const { data } = useQuery({
    queryKey: [chainId, pickedChainId, 'prediction-configs'],
    queryFn: () => getPredictionConfig(pickedChainId || chainId),
    enabled: Boolean(chainId),
  })
  return data
}
