# Pancake Multicall

Enhanced multicall sdk to safely make multicalls within the gas limit.

Inspired by the [1inch multicall](https://github.com/1inch/multicall).

## Install

```bash
$ pnpm add @sarcoinswap/multicall @sarcoinswap/sdk viem
```

## Usage

### Basic usage

By default the calls will be splitted into chunks based on gas limit of each call and the rpc call gas limit of the chain

```typescript
import { ChainId } from '@sarcoinswap/chains'
import { multicallByGasLimit, MulticallRequestWithGas } from '@sarcoinswap/multicall'

const calls: MulticallRequestWithGas[] = [
  {
    // Target contract to call
    target: '0x',
    // Encoded call data
    callData: '',
    // The maximum gas limit set to this single call
    gasLimit: 1_000_000,
  },
]

const { results, blockNumber, chunkCount, chunkSizes } = await multicallByGasLimit(calls, {
  chainId: ChainId.BSC,

  // Rpc client. Please refer to `PublicClient` from viem
  client,
})

for (const { success, result, gasUsed } of results) {
  if (success) {
    // Decode result
    decodeResult(result)
  }
}
```

### Advanced usage

The rpc call gas limit can be overriden if provided. Once provided, the multicall sdk won't ask for the gas limit from on chain.

```typescript
const { results, blockNumber } = await multicallByGasLimit(calls, {
  chainId: ChainId.BSC,
  client,
  gasLimit: 150_000_000,
})
```

## Other utilities

### Get multicall gas limit

```typescript
import { ChainId } from '@sarcoinswap/chains'
import { getGasLimitOnChain } from '@sarcoinswap/multicall'

// Get the rpc call gas limit of the specified chain
const gasLimit = await getGasLimitOnChain(ChainId.BSC)
```

## Supported chains

For supported chains and contract addresses, please refer to [multicall contracts](https://github.com/pancakeswap/pancake-frontend/blob/develop/packages/multicall/src/constants/contracts.ts).
