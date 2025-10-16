import { BestTradeOptions as BaseBestTradeOptions, Currency, Pair } from '@sarcoinswap/sdk'
import { ChainId } from '@sarcoinswap/chains'
import { PublicClient } from 'viem'

export type Provider = ({ chainId }: { chainId?: ChainId }) => PublicClient

export interface BestTradeOptions extends BaseBestTradeOptions {
  provider: Provider

  // If not provided, will use the given provider to fetch pairs on chain
  allCommonPairs?: Pair[] | ((one: Currency, another: Currency) => Promise<Pair[]> | Pair[])
}

export enum RouteType {
  V2,
  STABLE_SWAP,
  MIXED,
}
