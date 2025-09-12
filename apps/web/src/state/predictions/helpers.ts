import { ChainId } from '@pancakeswap/chains'
import {
  BetPosition,
  PredictionContractVersion,
  PredictionStatus,
  PredictionSupportedSymbol,
  ROUNDS_PER_PAGE,
  aiPredictionsABI,
  predictionsV2ABI,
  predictionsV21ABI,
} from '@pancakeswap/prediction'
import { gql, request } from 'graphql-request'
import {
  Bet,
  HistoryFilter,
  LedgerData,
  NodeRound,
  PredictionsState,
  ReduxNodeLedger,
  ReduxNodeRound,
  RoundData,
} from 'state/types'
import { getPredictionsV21Contract, getPredictionsV2Contract } from 'utils/contractHelpers'
import { PredictionsLedgerResponse, PredictionsRoundsResponse } from 'utils/types'
import { publicClient } from 'utils/wagmi'
import { Address } from 'viem'
import { BetResponseBNB } from './bnbQueries'
import { transformBetResponseBNB, transformUserResponseBNB } from './bnbTransformers'
import { BetResponseCAKE } from './cakeQueries'
import { transformBetResponseCAKE, transformUserResponseCAKE } from './cakeTransformers'
import { newTransformBetResponse, newTransformUserResponse } from './newTransformers'
import { getBetBaseFields, getRoundBaseFields, getUserBaseFields } from './queries'
import { BetResponse, UserResponse } from './responseType'

const convertBigInt = (value: string | null): null | bigint => (!value ? null : BigInt(value))

export const deserializeRound = (round: ReduxNodeRound): NodeRound => ({
  ...round,
  bearAmount: convertBigInt(round.bearAmount),
  bullAmount: convertBigInt(round.bullAmount),
  totalAmount: convertBigInt(round.totalAmount),
  lockPrice: convertBigInt(round.lockPrice),
  closePrice: convertBigInt(round.closePrice),
  rewardBaseCalAmount: convertBigInt(round.rewardBaseCalAmount),
  rewardAmount: convertBigInt(round.rewardAmount),
  AIPrice: convertBigInt(round.AIPrice || null),
})

export enum Result {
  WIN = 'win',
  LOSE = 'lose',
  CANCELED = 'canceled',
  HOUSE = 'house',
  LIVE = 'live',
}

export const transformBetResponse = (tokenSymbol: string, chainId: ChainId | undefined) => {
  // BSC CAKE
  if (tokenSymbol === PredictionSupportedSymbol.CAKE && chainId === ChainId.BSC) {
    return transformBetResponseCAKE
  }
  // BSC BNB
  if (
    (tokenSymbol === PredictionSupportedSymbol.BNB && chainId === ChainId.BSC) ||
    (tokenSymbol === 'tBNB' && chainId === ChainId.BSC_TESTNET)
  ) {
    return transformBetResponseBNB
  }

  return newTransformBetResponse
}

export const transformUserResponse = (tokenSymbol: string, chainId: ChainId | undefined) => {
  // BSC CAKE
  if (tokenSymbol === PredictionSupportedSymbol.CAKE && chainId === ChainId.BSC) {
    return transformUserResponseCAKE
  }
  // BSC BNB
  if (
    (tokenSymbol === PredictionSupportedSymbol.BNB && chainId === ChainId.BSC) ||
    (tokenSymbol === 'tBNB' && chainId === ChainId.BSC_TESTNET)
  ) {
    return transformUserResponseBNB
  }

  return newTransformUserResponse
}

export const getRoundResult = (bet: Bet, currentEpoch: number): Result => {
  const { round } = bet
  if (round?.failed) {
    return Result.CANCELED
  }

  if (Number(round?.epoch) >= currentEpoch - 1) {
    return Result.LIVE
  }

  // House Win would not occur in AI-based predictions, only in normal prediction feature
  if (bet?.round?.position === BetPosition.HOUSE) {
    return Result.HOUSE
  }

  let roundResultPosition: BetPosition

  // If AI-based prediction.
  if (round?.AIPrice) {
    if (
      // Result: UP, AI Voted: UP => AI Win
      (Number(round?.closePrice) > Number(round?.lockPrice) && Number(round.AIPrice) > Number(round.lockPrice)) ||
      // Result: DOWN, AI Voted: DOWN => AI Win
      (Number(round?.closePrice) < Number(round?.lockPrice) && Number(round.AIPrice) < Number(round.lockPrice)) ||
      // Result: SAME, AI Voted: SAME => AI Win
      (Number(round?.closePrice) === Number(round?.lockPrice) && Number(round.AIPrice) === Number(round.lockPrice))
    ) {
      // Follow AI wins
      roundResultPosition = BetPosition.BULL
    } else {
      // Against AI wins
      roundResultPosition = BetPosition.BEAR
    }
  } else {
    roundResultPosition = Number(round?.closePrice) > Number(round?.lockPrice) ? BetPosition.BULL : BetPosition.BEAR
  }

  return bet.position === roundResultPosition ? Result.WIN : Result.LOSE
}

export const getFilteredBets = (bets: Bet[], filter: HistoryFilter) => {
  switch (filter) {
    case HistoryFilter.COLLECTED:
      return bets.filter((bet) => bet.claimed === true)
    case HistoryFilter.UNCOLLECTED:
      return bets.filter((bet) => {
        return !bet.claimed && (bet.position === bet?.round?.position || bet?.round?.failed === true)
      })
    case HistoryFilter.ALL:
    default:
      return bets
  }
}

type WhereClause = Record<string, string | number | boolean | string[]>

export const getBetHistory = async (
  where: WhereClause = {},
  first = 1000,
  skip = 0,
  api: string,
  tokenSymbol: string,
): Promise<Array<BetResponseBNB | BetResponseCAKE>> => {
  const response = await request(
    api,
    gql`
      query getBetHistory($first: Int!, $skip: Int!, $where: Bet_filter) {
        bets(first: $first, skip: $skip, where: $where, orderBy: createdAt, orderDirection: desc) {
          ${getBetBaseFields(tokenSymbol)}
          round {
            ${getRoundBaseFields}
          }
          user {
            ${getUserBaseFields(tokenSymbol)}
          }
        }
      }
    `,
    { first, skip, where },
  )
  return response.bets
}

export const getLedgerData = async (
  account: Address,
  chainId: ChainId,
  epochs: number[],
  address: Address,
  version: PredictionContractVersion = PredictionContractVersion.V2,
): Promise<PredictionsLedgerResponse[]> => {
  const client = publicClient({ chainId })

  const v2Abi = version === PredictionContractVersion.V2_1 ? predictionsV21ABI : predictionsV2ABI

  const response = await client.multicall({
    contracts: epochs.map(
      (epoch) =>
        ({
          address,
          abi: v2Abi,
          functionName: 'ledger',
          args: [BigInt(epoch), account] as const,
        } as const),
    ),
    allowFailure: false,
  })

  const serializeV2Ledger = (r: any) => {
    if (version === PredictionContractVersion.V2_1) {
      return { position: r[0] as 1 | 0, claimed: r[1], amount: r[2] }
    }
    return { position: r[0] as 1 | 0, amount: r[1], claimed: r[2] }
  }

  return response.map(serializeV2Ledger)
}

export const LEADERBOARD_RESULTS_PER_PAGE = 20

interface GetPredictionUsersOptions {
  skip?: number
  first?: number
  orderBy?: string
  orderDir?: string
  where?: WhereClause
}

const defaultPredictionUserOptions = {
  skip: 0,
  first: LEADERBOARD_RESULTS_PER_PAGE,
  orderBy: 'createdAt',
  orderDir: 'desc',
}

export const getHasRoundFailed = (
  oracleCalled: boolean,
  closeTimestamp: null | number,
  buffer: number,
  closePrice: null | bigint,
) => {
  if (closePrice === 0n) {
    return true
  }

  if (!oracleCalled || !closeTimestamp) {
    const closeTimestampMs = (Number(closeTimestamp) + buffer) * 1000

    if (Number.isFinite(closeTimestampMs)) {
      return Date.now() > closeTimestampMs
    }
  }

  return false
}

export const getPredictionUsers = async (
  options: GetPredictionUsersOptions = {},
  api: string,
  tokenSymbol: string,
): Promise<UserResponse<BetResponse>[]> => {
  const { first, skip, where, orderBy, orderDir } = { ...defaultPredictionUserOptions, ...options }
  const response = await request(
    api,
    gql`
      query getUsers($first: Int!, $skip: Int!, $where: User_filter, $orderBy: User_orderBy, $orderDir: OrderDirection) {
        users(first: $first, skip: $skip, where: $where, orderBy: $orderBy, orderDirection: $orderDir) {
          ${getUserBaseFields(tokenSymbol)}
        }
      }
    `,
    { first, skip, where, orderBy, orderDir },
  )
  return response.users
}

export const getPredictionUser = async (
  account: string,
  api: string,
  tokenSymbol: string,
): Promise<UserResponse<BetResponse>> => {
  const response = await request(
    api,
    gql`
      query getUser($id: ID!) {
        user(id: $id) {
          ${getUserBaseFields(tokenSymbol)}
        }
      }
  `,
    {
      id: account.toLowerCase(),
    },
  )
  return response.user
}

export const getClaimStatuses = async (
  account: Address,
  chainId: ChainId,
  epochs: number[],
  address: Address,
): Promise<PredictionsState['claimableStatuses']> => {
  const client = publicClient({ chainId })
  const response = await client.multicall({
    contracts: epochs.map(
      (epoch) =>
        ({
          address,
          abi: predictionsV2ABI,
          functionName: 'claimable',
          args: [BigInt(epoch), account] as const,
        } as const),
    ),
    allowFailure: false,
  })

  return response.reduce((accum, claimable, index) => {
    const epoch = epochs[index]

    return {
      ...accum,
      [epoch]: claimable,
    }
  }, {})
}

export type MarketData = Pick<PredictionsState, 'status' | 'currentEpoch' | 'intervalSeconds' | 'minBetAmount'>
export const getPredictionData = async (address: Address, chainId: ChainId): Promise<MarketData> => {
  const client = publicClient({ chainId })
  const [currentEpoch, intervalSeconds, minBetAmount, paused] = await client.multicall({
    contracts: [
      {
        address,
        abi: predictionsV2ABI,
        functionName: 'currentEpoch',
      },
      {
        address,
        abi: predictionsV2ABI,
        functionName: 'intervalSeconds',
      },
      {
        address,
        abi: predictionsV2ABI,
        functionName: 'minBetAmount',
      },
      {
        address,
        abi: predictionsV2ABI,
        functionName: 'paused',
      },
    ],
    allowFailure: false,
  })

  return {
    status: paused ? PredictionStatus.PAUSED : PredictionStatus.LIVE,
    currentEpoch: Number(currentEpoch),
    intervalSeconds: Number(intervalSeconds),
    minBetAmount: minBetAmount.toString(),
  }
}

export const getRoundsData = async (
  epochs: number[],
  chainId: ChainId,
  address: Address,
  version: PredictionContractVersion = PredictionContractVersion.V2,
  { isAIPrediction = true }: { isAIPrediction?: boolean } = {},
): Promise<PredictionsRoundsResponse[]> => {
  const client = publicClient({ chainId })

  const v2Abi = version === PredictionContractVersion.V2_1 ? predictionsV21ABI : predictionsV2ABI

  const response = await client.multicall({
    contracts: epochs.map(
      (epoch) =>
        ({
          address,
          abi: isAIPrediction ? aiPredictionsABI : v2Abi,
          functionName: 'rounds',
          args: [BigInt(epoch)] as const,
        } as const),
    ),
    allowFailure: false,
  })

  const serializeV2Round = (r: any) => {
    // Predictions V2.1
    if (version === PredictionContractVersion.V2_1) {
      return {
        epoch: BigInt(r[0]),
        startTimestamp: BigInt(r[1]),
        lockTimestamp: BigInt(r[2]),
        closeTimestamp: BigInt(r[3]),
        lockPrice: r[4],
        closePrice: r[5],
        lockOracleId: r[6],
        closeOracleId: r[7],
        oracleCalled: Boolean(r[8]),
        totalAmount: r[9],
        bullAmount: r[10],
        bearAmount: r[11],
        rewardBaseCalAmount: BigInt(r[12]),
        rewardAmount: r[13] || 0n,
      }
    }

    // Predictions V2
    return {
      epoch: BigInt(r[0]),
      startTimestamp: BigInt(r[1]),
      lockTimestamp: BigInt(r[2]),
      closeTimestamp: BigInt(r[3]),
      lockPrice: r[4],
      closePrice: r[5],
      lockOracleId: r[6],
      closeOracleId: r[7],
      totalAmount: r[8],
      bullAmount: r[9],
      bearAmount: r[10],
      rewardBaseCalAmount: BigInt(r[11]),
      rewardAmount: r[12] || 0n,
      oracleCalled: Boolean(r[13]),
    }
  }

  return response.map((r, i) =>
    isAIPrediction
      ? {
          epoch: BigInt(epochs[i]), // Should be in same order according to viem multicall docs
          startTimestamp: BigInt(r[0]),
          lockTimestamp: BigInt(r[1]),
          closeTimestamp: BigInt(r[2]),
          AIPrice: r[3] as bigint,
          lockPrice: r[4] as bigint,
          closePrice: r[5] as bigint,
          totalAmount: r[6] as bigint,
          bullAmount: r[7] as bigint,
          bearAmount: r[8] as bigint,
          rewardBaseCalAmount: r[9] as bigint,
          rewardAmount: r[10] as bigint,
          oracleCalled: Boolean(r[11]),
        }
      : serializeV2Round(r),
  )
}

export const makeFutureRoundResponse = (epoch: number, startTimestamp: number): ReduxNodeRound => {
  return {
    epoch,
    startTimestamp,
    lockTimestamp: null,
    closeTimestamp: null,
    lockPrice: null,
    closePrice: null,
    totalAmount: '0',
    bullAmount: '0',
    bearAmount: '0',
    rewardBaseCalAmount: '0',
    rewardAmount: '0',
    oracleCalled: false,
    lockOracleId: null,
    closeOracleId: null,
  }
}

export const makeRoundData = (rounds: ReduxNodeRound[]): RoundData => {
  return rounds.reduce((accum, round) => {
    return {
      ...accum,
      [round.epoch.toString()]: round,
    }
  }, {})
}

export const serializePredictionsLedgerResponse = (ledgerResponse: PredictionsLedgerResponse): ReduxNodeLedger => {
  return {
    position: ledgerResponse.position === 0 ? BetPosition.BULL : BetPosition.BEAR,
    amount: ledgerResponse.amount.toString(),
    claimed: ledgerResponse.claimed,
  }
}

export const makeLedgerData = (account: string, ledgers: PredictionsLedgerResponse[], epochs: number[]): LedgerData => {
  return ledgers.reduce((accum, ledgerResponse, index) => {
    if (!ledgerResponse) {
      return accum
    }

    // If the amount is zero that means the user did not bet
    if (ledgerResponse.amount === 0n) {
      return accum
    }

    const epoch = epochs[index].toString()

    return {
      ...accum,
      [account]: {
        ...accum[account],
        [epoch]: serializePredictionsLedgerResponse(ledgerResponse),
      },
    }
  }, {})
}

/**
 * Serializes the return from the "rounds" call for redux
 */
export const serializePredictionsRoundsResponse = (response: PredictionsRoundsResponse): ReduxNodeRound => {
  const {
    epoch,
    startTimestamp,
    lockTimestamp,
    closeTimestamp,
    lockPrice,
    closePrice,
    totalAmount,
    bullAmount,
    bearAmount,
    rewardBaseCalAmount,
    rewardAmount,
    oracleCalled,
    lockOracleId,
    closeOracleId,
    AIPrice,
  } = response

  const lockPriceAmount = lockPrice === 0n ? null : lockPrice.toString()
  const closePriceAmount = closePrice === 0n ? null : closePrice.toString()

  return {
    oracleCalled,
    epoch: Number(epoch),
    startTimestamp: startTimestamp === 0n ? null : Number(startTimestamp),
    lockTimestamp: lockTimestamp === 0n ? null : Number(lockTimestamp),
    closeTimestamp: closeTimestamp === 0n ? null : Number(closeTimestamp),
    lockPrice: lockPriceAmount,
    closePrice: closePriceAmount,
    totalAmount: totalAmount.toString(),
    bullAmount: bullAmount.toString(),
    bearAmount: bearAmount.toString(),
    rewardBaseCalAmount: rewardBaseCalAmount.toString(),
    rewardAmount: rewardAmount.toString(),

    // PredictionsV2
    lockOracleId: lockOracleId?.toString(),
    closeOracleId: closeOracleId?.toString(),

    // AI Predictions
    AIPrice: AIPrice?.toString(),
  }
}

export const fetchUsersRoundsLength = async (
  account: Address,
  chainId: ChainId,
  address: Address,
  version: PredictionContractVersion = PredictionContractVersion.V2,
) => {
  try {
    let contract

    if (version === PredictionContractVersion.V2_1) contract = getPredictionsV21Contract(address, chainId)
    else contract = getPredictionsV2Contract(address, chainId)

    const length = await contract.read.getUserRoundsLength([account])
    return length
  } catch {
    return 0n
  }
}

/**
 * Fetches rounds a user has participated in
 */
export const fetchUserRounds = async (
  account: Address,
  chainId: ChainId,
  cursor = 0,
  size = ROUNDS_PER_PAGE,
  address: Address,
  version: PredictionContractVersion = PredictionContractVersion.V2,
): Promise<null | { [key: string]: ReduxNodeLedger }> => {
  try {
    let contract

    // V2 and V2.1 contracts differ only in the array order of Ledger Position Response
    if (version === PredictionContractVersion.V2_1) {
      contract = getPredictionsV21Contract(address, chainId)
    } else {
      contract = getPredictionsV2Contract(address, chainId)
    }
    const [rounds, ledgers] = await contract.read.getUserRounds([account, BigInt(cursor), BigInt(size)])

    return rounds.reduce((accum, round, index) => {
      return {
        ...accum,
        [round.toString()]: serializePredictionsLedgerResponse(ledgers[index] as PredictionsLedgerResponse),
      }
    }, {})
  } catch {
    // When the results run out the contract throws an error.
    return null
  }
}
