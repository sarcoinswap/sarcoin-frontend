import { Percent as PancakePercent } from '@sarcoinswap/sdk'

export function encodeFeeBips(fee: PancakePercent): string {
  return fee.multiply(10_000).quotient.toString()
}
