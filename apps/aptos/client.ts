import { createClient } from '@sarcoinswap/awgmi'
import { FewchaConnector } from '@sarcoinswap/awgmi/connectors/fewcha'
import { MartianConnector } from '@sarcoinswap/awgmi/connectors/martian'
import { MsafeConnector } from '@sarcoinswap/awgmi/connectors/msafe'
import { PetraConnector } from '@sarcoinswap/awgmi/connectors/petra'
import { PontemConnector } from '@sarcoinswap/awgmi/connectors/pontem'
import { RiseConnector } from '@sarcoinswap/awgmi/connectors/rise'
import { SafePalConnector } from '@sarcoinswap/awgmi/connectors/safePal'
import { Aptos, AptosConfig, Network, NetworkToNetworkName } from '@aptos-labs/ts-sdk'
import { chains, defaultChain } from 'config/chains'

const NODE_REAL_API = process.env.NEXT_PUBLIC_NODE_REAL_API
const NODE_REAL_API_TESTNET = process.env.NEXT_PUBLIC_NODE_REAL_API_TESTNET
const APTOS_GATEWAY_API_KEY = process.env.NEXT_PUBLIC_APTOS_GATEWAY_API_KEY

const nodeReal = {
  ...(NODE_REAL_API && {
    mainnet: NODE_REAL_API,
  }),
  ...(NODE_REAL_API_TESTNET && {
    testnet: NODE_REAL_API_TESTNET,
  }),
}

export const msafeConnector = new MsafeConnector({ chains })

export const client = createClient({
  connectors: [
    new PetraConnector({ chains }),
    new PontemConnector({ chains }),
    new FewchaConnector({ chains }),
    new PetraConnector({ chains, options: { name: 'Trust Wallet', id: 'trustWallet' } }),
    new RiseConnector({ chains }),
    // Give precedence to SafePalConnector, as the SafePal wallet also assigns itself to the Martian window object
    new SafePalConnector({ chains }),
    new MartianConnector({ chains }),
    msafeConnector,
  ],
  provider: ({ networkName }) => {
    const networkNameLowerCase = networkName?.toLowerCase()
    const network = NetworkToNetworkName[networkNameLowerCase ?? defaultChain.network.toLowerCase()]
    const clientConfig =
      network === Network.MAINNET
        ? {
            API_KEY: APTOS_GATEWAY_API_KEY,
          }
        : undefined

    if (networkNameLowerCase) {
      const foundChain = chains.find((c) => c.network === networkNameLowerCase)
      if (foundChain) {
        if (foundChain.nodeUrls.nodeReal && nodeReal[networkNameLowerCase]) {
          return new Aptos(
            new AptosConfig({
              network,
              fullnode: `${foundChain.nodeUrls.nodeReal}/${nodeReal[networkNameLowerCase]}/v1`,
              clientConfig: {
                WITH_CREDENTIALS: false,
              },
            }),
          )
        }
        return new Aptos(
          new AptosConfig({
            network,
            clientConfig,
          }),
        )
      }
    }

    return new Aptos(
      new AptosConfig({
        network,
        fullnode: defaultChain.nodeUrls.default,
        clientConfig,
      }),
    )
  },
  autoConnect: false,
})
