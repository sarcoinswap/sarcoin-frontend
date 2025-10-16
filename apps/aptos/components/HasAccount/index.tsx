import { useAccount } from '@sarcoinswap/awgmi'
import { useIsMounted } from '@sarcoinswap/hooks'

export default function HasAccount({ fallbackComp, children }) {
  const { account } = useAccount()
  const isMounted = useIsMounted()

  return isMounted && account ? <>{children}</> : fallbackComp
}
