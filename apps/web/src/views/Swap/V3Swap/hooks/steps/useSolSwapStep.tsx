import { useTranslation } from '@pancakeswap/localization'
import { useWallet } from '@solana/wallet-adapter-react'
import { useToast } from '@pancakeswap/uikit'
import { ConfirmModalState } from '@pancakeswap/widgets-internal'
import { SolanaDescriptionWithTx } from 'components/Toast'
import { useCallback, useMemo } from 'react'
import { RetryableError, retry } from 'state/multicall/retry'
import { isSVMOrder } from 'views/Swap/utils'
import { VersionedTransaction } from '@solana/web3.js'
import { UltraSwapError, UltraSwapErrorType, ultraSwapService } from '@pancakeswap/solana-router-sdk'
import { confirmTransaction } from '@pancakeswap/solana-core-sdk'

import useAccountActiveChain from 'hooks/useAccountActiveChain'
import { useRefreshSolanaTokenBalances } from 'state/token/solanaTokenBalances'
import { useSolanaConnectionWithRpcAtom } from 'hooks/solana/useSolanaConnectionWithRpcAtom'
import useSwapRecordTransaction from '../useSwapRecordTransaction'
import { ConfirmStepContext } from './step.type'

export const useSolSwapStep = (context: ConfirmStepContext) => {
  const { order, resetState, showError, setConfirmState, setTxHash } = context
  const connection = useSolanaConnectionWithRpcAtom()
  const { solanaAccount } = useAccountActiveChain()
  const { signTransaction, wallet: solanaWallet } = useWallet()
  const { toastSuccess } = useToast()
  const { t } = useTranslation()
  const addSwapTransaction = useSwapRecordTransaction(order?.trade?.inputAmount.currency.chainId, solanaAccount || '')
  const refreshSolanaBalances = useRefreshSolanaTokenBalances(solanaWallet?.adapter.publicKey?.toBase58())
  const retryWaitForSolanaTransaction = useCallback(
    async (signature?: string) => {
      if (!signature) return undefined
      const waitTx = async () => {
        try {
          await confirmTransaction(connection, signature)
        } catch (error) {
          throw new RetryableError()
        }
      }
      const { promise } = retry(waitTx, { n: 5, minWait: 3000, maxWait: 5000 })
      return promise
    },
    [connection],
  )
  const solanaSwapStep = useMemo(() => {
    return {
      step: ConfirmModalState.PENDING_CONFIRMATION,
      action: async () => {
        if (!isSVMOrder(order) || !solanaAccount || !order.trade) {
          resetState()
          return
        }
        const publicKey = solanaWallet?.adapter.publicKey
        if (!signTransaction || !publicKey) {
          throw new UltraSwapError(
            'Wallet not connected, or missing wallet functions',
            UltraSwapErrorType.WALLET_SIGNING_FAILED,
          )
        }
        // Get the transaction from the order data
        const { transaction, requestId } = order.trade
        if (!transaction) {
          showError('No transaction data found for Solana swap')
          return
        }

        try {
          const based64tx = Buffer.from(transaction, 'base64')
          const versionedTransaction = VersionedTransaction.deserialize(new Uint8Array(based64tx))
          const signedTransaction = await signTransaction(versionedTransaction)
          const serializedTransaction = Buffer.from(signedTransaction.serialize()).toString('base64')

          // Submit swap to UltraSwapService
          const response = await ultraSwapService.submitSwap(serializedTransaction, requestId)

          if (response.status === 'Failed') {
            const error = new UltraSwapError(response.error, UltraSwapErrorType.FAILED, response.signature)
            showError(error.message || response.error || 'Solana swap failed')
            return
          }

          const { signature } = response
          setTxHash(signature)

          try {
            addSwapTransaction({
              order,
              hash: signature as any,
              type: 'SolanaSwap',
              receipt: {} as any,
            })
          } catch (error) {
            console.error('Failed to add transaction', error)
          }

          toastSuccess(
            t('Success!'),
            <SolanaDescriptionWithTx txHash={signature}>{t('Solana swap submitted')}</SolanaDescriptionWithTx>,
          )

          setConfirmState(ConfirmModalState.COMPLETED)

          // Wait for transaction confirmation then refresh balances
          await retryWaitForSolanaTransaction(signature)
          refreshSolanaBalances()
        } catch (error: any) {
          console.error('Solana swap error', error)
          if (error?.message?.includes('rejected')) {
            showError('Transaction rejected by user')
          } else if (error?.message?.includes('insufficient')) {
            showError('Insufficient balance for transaction')
          } else if (error?.message?.includes('wallet')) {
            showError('Please connect your Solana wallet first')
          } else {
            showError(typeof error === 'string' ? error : error?.message || 'Solana swap failed')
          }
        }
      },
      showIndicator: false,
      getCalldata: () => [],
    }
  }, [
    solanaAccount,
    order,
    resetState,
    showError,
    toastSuccess,
    t,
    signTransaction,
    retryWaitForSolanaTransaction,
    refreshSolanaBalances,
    solanaWallet?.adapter.publicKey,
  ])

  return solanaSwapStep
}
