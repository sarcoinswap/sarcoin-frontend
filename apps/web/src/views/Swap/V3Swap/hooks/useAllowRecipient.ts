import { useExpertMode } from '@sarcoinswap/utils/user'
import useAccountActiveChain from 'hooks/useAccountActiveChain'
import { isEvm } from '@sarcoinswap/chains'

import { useIsWrapping } from './useIsWrapping'

export function useAllowRecipient() {
  const [isExpertMode] = useExpertMode()
  const { chainId } = useAccountActiveChain()
  const isWrapping = useIsWrapping()
  return isExpertMode && !isWrapping && isEvm(chainId)
}
