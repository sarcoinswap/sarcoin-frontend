import { useAccount, useProvider } from '@sarcoinswap/awgmi'
import { useIsMounted } from '@sarcoinswap/hooks'
import { useActiveChainId, useActiveNetwork } from './useNetwork'

export default function useActiveWeb3React() {
  const isMounted = useIsMounted()

  const { networkName } = useActiveNetwork()
  const chainId = useActiveChainId()
  const provider = useProvider({ networkName })
  const { account } = useAccount()

  return {
    chainId,
    networkName,
    provider,
    account: isMounted ? account?.address : undefined,
  }
}
