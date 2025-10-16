import { isSolana } from '@sarcoinswap/chains'
import { TICK_SPACINGS } from '@sarcoinswap/v3-sdk'
import { PoolInfo, SolanaV3PoolInfo } from 'state/farmsV4/state/type'

export const getTickSpacing = (poolInfo: PoolInfo) => {
  return isSolana(poolInfo.chainId)
    ? (poolInfo as SolanaV3PoolInfo).rawPool.config.tickSpacing
    : TICK_SPACINGS[poolInfo.feeTier]
}
