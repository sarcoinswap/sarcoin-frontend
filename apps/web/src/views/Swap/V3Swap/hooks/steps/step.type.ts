import { PriceOrder } from '@sarcoinswap/price-api-sdk'
import { CurrencyAmount, Token } from '@sarcoinswap/swap-sdk-core'
import { ConfirmModalState } from '@sarcoinswap/widgets-internal'
import { Dispatch, SetStateAction } from 'react'
import { Address } from 'viem/accounts'
import { Calldata } from 'hooks/usePermit2'

export interface ConfirmAction {
  step: ConfirmModalState
  action: (nextStep?: ConfirmModalState) => Promise<void>
  showIndicator: boolean
  getCalldata?: <T = Calldata>() => T
}

export interface ConfirmStepContext {
  order: PriceOrder | undefined
  amountToApprove: CurrencyAmount<Token> | undefined
  spender: Address | undefined
  resetState: () => void
  showError: (message: string) => void
  setConfirmState: Dispatch<SetStateAction<ConfirmModalState>>
  setTxHash: Dispatch<SetStateAction<string | undefined>>
}
