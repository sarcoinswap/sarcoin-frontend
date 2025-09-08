import { INetworkProps, ITokenProps, toTokenValue } from '@pancakeswap/widgets-internal'
import { useMemo } from 'react'
import { getKeyForPools, useAccountV2LpDetails, useV2PoolsLength } from 'state/farmsV4/hooks'
import { POSITION_STATUS, V2LPDetail } from 'state/farmsV4/state/accountPositions/type'
import { useAccount } from 'wagmi'
import { useAllChainIds } from './useMultiChains'

export const useV2Positions = ({
  selectedNetwork,
  selectedTokens,
  positionStatus,
  farmsOnly,
}: {
  selectedNetwork: INetworkProps['value']
  selectedTokens: ITokenProps['value']
  positionStatus: POSITION_STATUS
  farmsOnly: boolean
}) => {
  const { address: account } = useAccount()
  const allChainIds = useAllChainIds()
  const { data: v2Positions, pending: v2Loading } = useAccountV2LpDetails(allChainIds, account)

  const filteredV2Positions = useMemo(
    () =>
      v2Positions.filter(
        (pos) =>
          selectedNetwork.includes(pos.pair.chainId) &&
          (!selectedTokens?.length ||
            selectedTokens.some(
              (token) => token === toTokenValue(pos.pair.token0) || token === toTokenValue(pos.pair.token1),
            )) &&
          [POSITION_STATUS.ALL, POSITION_STATUS.ACTIVE].includes(positionStatus) &&
          (!farmsOnly || pos.isStaked),
      ),
    [farmsOnly, selectedNetwork, selectedTokens, v2Positions, positionStatus],
  )

  const { data: poolsLength } = useV2PoolsLength(allChainIds)

  return {
    v2Loading,
    v2Positions: filteredV2Positions,
    v2PoolsLength: poolsLength as Record<number, number>,
  }
}

export const getV2PositionKey = (pos: V2LPDetail) => {
  const {
    pair: {
      chainId,
      liquidityToken: { address },
    },
  } = pos
  return getKeyForPools({
    chainId,
    poolAddress: address,
  })
}
