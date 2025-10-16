import { ChainId } from '@sarcoinswap/chains'
import { useTranslation } from '@sarcoinswap/localization'
import { BscScanIcon, BscTraceIcon, Link, Text } from '@sarcoinswap/uikit'
import truncateHash from '@sarcoinswap/utils/truncateHash'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useMemo } from 'react'
import { useBlockExploreLink, useBlockExploreName } from 'utils'

interface DescriptionWithTxProps {
  description?: string
  txHash?: string
  txChainId?: number
  bscTrace?: boolean
}

const DescriptionWithTx: React.FC<React.PropsWithChildren<DescriptionWithTxProps>> = ({
  txHash,
  txChainId,
  children,
  bscTrace,
}) => {
  const { chainId } = useActiveChainId()
  const { t } = useTranslation()
  const blockExplorerName = useBlockExploreName(txChainId || chainId)
  const getBlockExploreLink = useBlockExploreLink()
  const explorerName = useMemo(() => {
    if (!bscTrace) return blockExplorerName
    return 'BscTrace'
  }, [bscTrace, blockExplorerName])
  const explorerLink = useMemo(() => {
    const link = getBlockExploreLink(txHash, 'transaction', txChainId || chainId)
    if (bscTrace) {
      return link.replace('bscscan.com', 'bsctrace.com')
    }
    return link
  }, [bscTrace, chainId, txChainId, txHash])

  return (
    <>
      {typeof children === 'string' ? <Text as="p">{children}</Text> : children}
      {txHash && (
        <Link external href={explorerLink}>
          {t('View on %site%', { site: explorerName })}: {truncateHash(txHash, 8, 0)}
          {(txChainId || chainId) === ChainId.BSC && bscTrace ? (
            <BscTraceIcon color="primary" ml="4px" />
          ) : (
            <BscScanIcon color="primary" ml="4px" />
          )}
        </Link>
      )}
    </>
  )
}

export default DescriptionWithTx
