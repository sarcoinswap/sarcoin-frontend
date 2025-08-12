import safeGetWindow from '@pancakeswap/utils/safeGetWindow'
import { chains } from 'utils/wagmi'
import { createConnector } from 'wagmi'
import { eip6963Providers } from './WalletProvider'

function getMMProvider() {
  const window = safeGetWindow()
  if (window) {
    if (window.ethereum) {
      if (window.ethereum.isMetaMask && !window.ethereum.isPhantom) {
        return window.ethereum
      }
    }
  }
  const provider = eip6963Providers.find((p) => p.info.name === 'MetaMask')?.provider
  return provider || null
}
export const customMetaMaskConnector = createConnector(() => ({
  id: 'metaMask',
  name: 'metaMask',
  type: 'metaMask',

  async connect({ chainId } = {}) {
    const provider = getMMProvider()
    if (!provider) throw new Error('MetaMask not found')

    const accounts = await provider.request({ method: 'eth_requestAccounts' })
    const currentChainId = await provider.request({ method: 'eth_chainId' })

    return {
      accounts: accounts as readonly `0x${string}`[],
      chainId: chainId ?? parseInt(currentChainId, 16),
    }
  },

  async disconnect() {
    // MetaMask injected connectors typically don't require explicit disconnect logic
  },

  async getProvider() {
    return getMMProvider()
  },

  async isAuthorized() {
    const provider = getMMProvider()
    if (!provider) return false
    const accounts = await provider.request({ method: 'eth_accounts' })
    return accounts.length > 0
  },

  async getAccounts() {
    const provider = getMMProvider()
    if (!provider) return []
    const accounts = await provider.request({ method: 'eth_accounts' })
    return accounts as readonly `0x${string}`[]
  },

  async getChainId() {
    const provider = getMMProvider()
    if (!provider) throw new Error('MetaMask not found')
    const chainId = await provider.request({ method: 'eth_chainId' })
    return parseInt(chainId, 16)
  },

  onAccountsChanged(callback) {
    const provider = getMMProvider()
    provider?.on('accountsChanged', callback)
  },

  onChainChanged(chainId) {},

  onDisconnect(callback) {
    const provider = getMMProvider()
    provider?.on('disconnect', callback)
  },

  async switchChain(parameters) {
    const provider = getMMProvider()
    if (!provider) throw new Error('MetaMask not found')

    const { chainId } = parameters
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${chainId.toString(16)}` }],
    })
    const chain = chains.find((x) => x.id === chainId)!
    return chain
  },
}))
