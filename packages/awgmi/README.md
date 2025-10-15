# @sarcoinswap/awgmi

## Install

```bash
pnpm i @sarcoinswap/awgmi @tanstack/react-query
```

Connect to Aptos with similar [wagmi](https://github.com/wagmi-dev/wagmi) React hooks.

Support Aptos Wallet Connectors:

- Petra
- Martian
- Pontem
- Fewcha
- SafePal
- Trust Wallet
- Msafe

```jsx
import { createClient, AwgmiConfig, useConnect, getDefaultProviders, defaultChains } from '@sarcoinswap/awgmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PetraConnector } from '@sarcoinswap/awgmi/connectors/petra'
import { MartianConnector } from '@sarcoinswap/awgmi/connectors/martain'
import { SafePalConnector } from '@sarcoinswap/awgmi/connectors/safePal'
import { BloctoConnector } from '@sarcoinswap/awgmi/connectors/blocto'
import { FewchaConnector } from '@sarcoinswap/awgmi/connectors/fewcha'

// import { mainnet, testnet } from '@sarcoinswap/awgmi/core'
const chains = defaultChains // mainnet, testnet, devnet

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1_000 * 60 * 60 * 24, // 24 hours
      networkMode: 'offlineFirst',
      refetchOnWindowFocus: false,
      retry: 0,
    },
    mutations: {
      networkMode: 'offlineFirst',
    },
  },
})

export const client = createClient({
  connectors: [
    new PetraConnector({ chains }),
    new MartianConnector({ chains }),
    new PetraConnector({ chains, options: { name: 'Trust Wallet', id: 'trustWallet' } }),
    new SafePalConnector({ chains }),
    new BloctoConnector({ chains, options: { appId: BLOCTO_APP_ID } }),
    new FewchaConnector({ chains }),
  ],
  provider: getDefaultProviders,
  autoConnect: true,
})

function App() {
  return (
    <AwgmiConfig client={client}>
      <QueryClientProvider client={queryClient}>
        <YourApp />
      </QueryClientProvider>
    </AwgmiConfig>
  )
}
```

## Connector

```jsx
import { useConnect, useDisconnect } from '@sarcoinswap/awgmi'

function ConnectButton() {
  const { connect, connectors } = useConnect()

  return (
    <div>
      {connectors.map((connector) => (
        <button type="button" key={connector.id} onClick={() => connect({ connector, networkName: 'mainnet' })}>
          {connector.name}
        </button>
      ))}
    </div>
  )
}
```

## Hooks

```jsx
import {
  useAccountBalance,
  useAccountBalances,
  useAccountResource,
  useAccountResources,
  useCoin,
  useCoins,
  useNetwork,
  useSendTransaction,
  useSimulateTransaction,
  useTableItem,
} from '@sarcoinswap/awgmi'
```

### Balance

```js
const { data } = useAccountBalance({
  address: Address,
  coin: '0x1::aptos_coin::AptosCoin',
  watch: true,
})
```

### Send Transaction

```js
import { UserRejectedRequestError } from '@sarcoinswap/awgmi'

const { sendTransactionAsync } = useSendTransaction()

sendTransactionAsync({
  payload: {
    type: 'entry_function_payload',
    function: '<address>::message::set_message',
    arguments: ['are we gonna make it?'],
    type_arguments: [],
  },
}).catch((err) => {
  if (err instanceof UserRejectedRequestError) {
    // handle user reject
  }
  // handle transaction error
})
```
