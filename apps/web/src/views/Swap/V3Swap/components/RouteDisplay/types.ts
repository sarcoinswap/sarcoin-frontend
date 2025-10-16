import { Route } from '@sarcoinswap/smart-router'
import { Currency } from '@sarcoinswap/swap-sdk-core'

export type RouteDisplayEssentials = Pick<Route, 'path' | 'pools' | 'inputAmount' | 'outputAmount' | 'percent' | 'type'>

export type Pair = [Currency, Currency]
