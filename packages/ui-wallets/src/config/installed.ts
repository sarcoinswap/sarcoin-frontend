import { getTrustWalletProvider } from '@pancakeswap/wagmi/connectors/trustWallet'
import safeGetWindow from '@pancakeswap/utils/safeGetWindow'
import { isCyberWallet } from '@cyberlab/cyber-app-sdk'

export const isMetamaskInstalled = () => {
  if (!safeGetWindow()) {
    return false
  }

  try {
    if (window.ethereum?.isMetaMask) {
      // binance wallet doesn't support metamask
      return !window.ethereum?.isBinance
    }

    if (window.ethereum?.providers?.some((p) => p.isMetaMask)) {
      return true
    }
  } catch (e) {
    return false
  }

  return false
}

export const isBinanceWeb3WalletInstalled = () => {
  try {
    return Boolean(Boolean(safeGetWindow()?.isBinance) || Boolean(safeGetWindow()?.binancew3w))
  } catch (error) {
    console.error('Error checking Binance Web3 Wallet:', error)
    return false
  }
}

export const isTrustWalletInstalled = () => {
  return !!getTrustWalletProvider()
}

export const isOkxWalletInstalled = () => {
  return Boolean(safeGetWindow()?.okxwallet)
}

export const isOperaWalletInstalled = () => {
  return Boolean(safeGetWindow()?.ethereum?.isOpera)
}

export const isBraveWalletInstalled = () => {
  return Boolean(safeGetWindow()?.ethereum?.isBraveWallet)
}

export const isRabbyWalletInstalled = () => {
  return Boolean(safeGetWindow()?.ethereum?.isRabby)
}

export const isMathWalletInstalled = () => {
  return Boolean(safeGetWindow()?.ethereum?.isMathWallet)
}

export const isTokenPocketInstalled = () => {
  return Boolean(safeGetWindow()?.ethereum?.isTokenPocket) || Boolean(safeGetWindow()?.tokenpocket)
}

export const isSafePalInstalled = () => {
  return Boolean(safeGetWindow()?.ethereum?.isSafePal)
}

export const isCoin98Installed = () => {
  return Boolean(safeGetWindow()?.ethereum?.isCoin98) || Boolean(safeGetWindow()?.coin98)
}

export const isCyberWalletInstalled = () => {
  return Boolean(safeGetWindow() && isCyberWallet())
}

export const isPhantomWalletInstalled = () => {
  return Boolean(
    // safeGetWindow()?.ethereum?.isPhantom  // evm not we supported now
    safeGetWindow()?.phantom?.solana?.isPhantom,
  )
}
