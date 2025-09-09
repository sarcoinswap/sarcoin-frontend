import { useAtomValue } from 'jotai'
import { useRouter } from 'next/router'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useWalletClient } from 'wagmi'
import { isAddress } from 'viem'
import { getIFOContract } from '../hooks/ifo/useIFOContract'
import { ifoConfigs } from '../config'
import { ifoLoadingAnimationAtom } from '../atoms'
import { ifoVersionAtom } from '../atom/ifoVersionAtom'

import { SyncIfoContext } from './SyncIfoContext'
import { IfoV2Context } from './IfoV2Context'

interface ProviderProps {
  id?: string
  children: React.ReactNode
}

export const IfoV2Provider: React.FC<ProviderProps> = ({ id, children }) => {
  const { chainId } = useActiveChainId()
  const { query } = useRouter()
  const { data: signer } = useWalletClient()

  // Preload submitting animation
  useAtomValue(ifoLoadingAnimationAtom)

  const ifoId = (id ?? (query.ifo as string)) || ''

  const config = ifoId ? ifoConfigs.find((x) => x.id === ifoId) : ifoConfigs[0]
  if (!config) {
    return null
  }
  const customAddress = query.ca as string | undefined
  const ifoContract = getIFOContract(
    config?.id,
    signer ?? undefined,
    chainId,
    customAddress as `0x${string}` | undefined,
  )
  // info, pools and users will be attached in useIfo hook
  const value = { chainId, ifoContract, config, info: undefined, pools: undefined, users: undefined }

  return (
    <IfoV2Context.Provider value={value}>
      <SyncIfoContext id={config.id}>{children}</SyncIfoContext>
    </IfoV2Context.Provider>
  )
}
