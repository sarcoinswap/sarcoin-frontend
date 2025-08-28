export { MultichainWalletModal } from './components/MultichainWalletModal/MultichainWalletModal'
export type { MultichainWalletModalProps } from './components/MultichainWalletModal/types'
export { type WalletConfigV3, WalletAdaptedNetwork } from './types'
export { EvmConnectorNames, type SolanaConnectorNames } from './config/connectorNames'
export { SolanaProvider, SolanaProviderLocalStorageKey } from './components/SolanaProvider'
export { selectedWalletAtom } from './state/atom'

// reexport legacy wallet modal
export { previouslyUsedWalletsAtom as legacyPreviouslyUsedWalletsAtom } from './components/LegacyWalletModal/atom'
export { WalletModalV2 as LegacyWalletModal } from './components/LegacyWalletModal/WalletModal'
export type { WalletModalV2Props as LegacyWalletModalProps } from './components/LegacyWalletModal/types'
export type { WalletConfigV2 as LegacyWalletConfig } from './types'
export { WalletIds as LegacyWalletIds } from './components/LegacyWalletModal/legacyWalletIds'
export * from './error'
