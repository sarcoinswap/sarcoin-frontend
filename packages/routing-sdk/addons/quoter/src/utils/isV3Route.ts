import type { Pool } from '@sarcoinswap/routing-sdk'
import { isV3Pool, V3Pool } from '@sarcoinswap/routing-sdk-addon-v3'

type Route<P extends Pool = Pool> = {
  pools: P[]
}

export function isV3Route(r: Route): r is Route<V3Pool> {
  const { pools } = r
  return pools.every((p) => isV3Pool(p))
}
