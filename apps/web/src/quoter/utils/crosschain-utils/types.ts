import { BridgeOrder } from '@sarcoinswap/price-api-sdk'
import { ChainId } from '@sarcoinswap/sdk'
import { type Currency, CurrencyAmount } from '@sarcoinswap/swap-sdk-core'
import { TokenAddressMap } from '@sarcoinswap/token-lists'
import { Loadable } from '@sarcoinswap/utils/Loadable'
import { type QuoteQuery } from 'quoter/quoter.types'
import { type Route } from 'views/Swap/Bridge/api'
import { BridgeDataSchema, SwapDataSchema } from 'views/Swap/Bridge/types'
import { type InterfaceOrder } from 'views/Swap/utils'

export enum PatternType {
  BRIDGE_ONLY = 'BRIDGE_ONLY',
  BRIDGE_TO_SWAP = 'BRIDGE_TO_SWAP',
  SWAP_TO_BRIDGE = 'SWAP_TO_BRIDGE',
  SWAP_TO_BRIDGE_TO_SWAP = 'SWAP_TO_BRIDGE_TO_SWAP',
  BRIDGE_SOLANA_EVM = 'BRIDGE_SOLANA_EVM',
}

export interface QuoteContext {
  routes: Route[]
  userSlippage: number
  baseCurrencyAmount: CurrencyAmount<Currency>
  quoteCurrency: Currency
  tokenMap: TokenAddressMap<ChainId>
  atomGetters: {
    getBridgeQuote: (params: BridgeQuoteParams) => Loadable<BridgeOrder>
    getSwapQuote: (query: Partial<QuoteQuery>) => Loadable<InterfaceOrder>
  }
}

export interface BridgeQuoteParams {
  inputAmount: CurrencyAmount<Currency>
  outputCurrency: Currency
  commands?: (SwapDataSchema | BridgeDataSchema)[]
}

export interface DestinationSwapQuoteSchema {
  originSwapOrder: InterfaceOrder
  destinationSwapOrder: InterfaceOrder
}
