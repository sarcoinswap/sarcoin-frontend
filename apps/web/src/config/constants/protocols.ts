import { Protocol } from '@sarcoinswap/farms'

export const INFINITY_PROTOCOLS = [Protocol.InfinityCLAMM, Protocol.InfinityBIN]

export type InfinityProtocol = Protocol.InfinityCLAMM | Protocol.InfinityBIN
export type NonInfinityProtocol = Exclude<Protocol, Protocol.InfinityBIN | Protocol.InfinityCLAMM>
