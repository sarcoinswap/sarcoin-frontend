import { useTranslation } from '@pancakeswap/localization'
import { WalletConfigV2, WalletConnectorNotFoundError, WalletSwitchChainError } from '@pancakeswap/ui-wallets'
import { usePrivy } from '@privy-io/react-auth'
import { ConnectorNames, walletsConfig } from 'config/wallet'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useAppDispatch } from 'state'
import { CONNECTOR_MAP } from 'utils/wagmi'
import { ConnectorNotFoundError, SwitchChainNotSupportedError, useAccount, useConnect, useDisconnect } from 'wagmi'
import { eip6963Providers } from 'wallet/WalletProvider'
import { createEip6963Connector } from 'wallet/eip6963Connector'
import { useFirebaseAuth } from '../wallet/Privy/firebase'
import { clearUserStates } from '../utils/clearUserStates'
import { useActiveChainId } from './useActiveChainId'

const useAuth = () => {
  const dispatch = useAppDispatch()
  const { connectAsync, connectors } = useConnect()
  const { chain } = useAccount()
  const { disconnectAsync } = useDisconnect()
  const { chainId } = useActiveChainId()
  const { t } = useTranslation()
  const router = useRouter()
  const { logout: privyLogout, ready, authenticated } = usePrivy()
  const { signOutAndClearUserStates } = useFirebaseAuth()

  const login = useCallback(
    async (wallet: WalletConfigV2) => {
      const { connectorId, title } = wallet

      const findConnector = CONNECTOR_MAP[connectorId as ConnectorNames] || undefined
      let eipConnector: any

      if (connectorId === ConnectorNames.Injected) {
        const eip6963detail = eip6963Providers.find((p) => p.info.name.toLowerCase() === title.toLowerCase())
        if (eip6963detail) {
          eipConnector = createEip6963Connector(eip6963detail)
          console.log(`[wallet]`, 'createEip6963Connector', eip6963detail, eipConnector)
        }
      }
      const connector = eipConnector || findConnector

      try {
        if (!connector) return undefined
        return await connectAsync({ connector, chainId })
      } catch (error) {
        if (error instanceof ConnectorNotFoundError) {
          throw new WalletConnectorNotFoundError()
        }
        if (
          error instanceof SwitchChainNotSupportedError
          // TODO: wagmi
          // || error instanceof SwitchChainError
        ) {
          throw new WalletSwitchChainError(t('Unable to switch network. Please try it on your wallet'))
        }
      }
      return undefined
    },
    [connectors, connectAsync, chainId, t, router],
  )

  const logout = useCallback(async () => {
    console.log(`[wallet]`, 'logout', { chainId, authenticated, ready })
    try {
      if (authenticated && ready) {
        await signOutAndClearUserStates()
        await privyLogout()
      } else await disconnectAsync()
    } catch (error) {
      console.error(error)
    } finally {
      clearUserStates(dispatch, { chainId: chain?.id })
      // Clear wagmi storage to prevent auto-reconnect for wallets like Trust Wallet
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem('wagmi.recentConnectorId')
        window.localStorage.removeItem('wagmi.store')
      }
    }
  }, [disconnectAsync, dispatch, chain?.id, authenticated, ready, signOutAndClearUserStates, privyLogout])

  return { login, logout }
}

export default useAuth
