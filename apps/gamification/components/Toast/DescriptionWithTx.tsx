import { ChainId } from '@sarcoinswap/chains'
import { useTranslation } from '@sarcoinswap/localization'
import { BscScanIcon, Link, Text } from '@sarcoinswap/uikit'
import truncateHash from '@sarcoinswap/utils/truncateHash'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { getBlockExploreLink, getBlockExploreName } from 'utils'

interface DescriptionWithTxProps {
  description?: string
  txHash?: string
  txChainId?: number
}

const DescriptionWithTx: React.FC<React.PropsWithChildren<DescriptionWithTxProps>> = ({
  txHash,
  txChainId,
  children,
}) => {
  const { chainId } = useActiveChainId()
  const { t } = useTranslation()

  return (
    <>
      {typeof children === 'string' ? <Text as="p">{children}</Text> : children}
      {txHash && (
        <Link external href={getBlockExploreLink(txHash, 'transaction', txChainId || chainId)}>
          {t('View on %site%', { site: getBlockExploreName(txChainId || chainId) })}: {truncateHash(txHash, 8, 0)}
          {(txChainId || chainId) === ChainId.BSC && <BscScanIcon color="primary" ml="4px" />}
        </Link>
      )}
    </>
  )
}

export default DescriptionWithTx
