// TODO: aptos merge
import { AptosIcon, ScanLink, Text } from '@sarcoinswap/uikit'
import { useTranslation } from '@sarcoinswap/localization'
import truncateHash from '@sarcoinswap/utils/truncateHash'
import { useActiveChainId } from 'hooks/useNetwork'
import { getBlockExploreLink } from '../../utils'

interface DescriptionWithTxProps {
  description?: string
  txHash?: string
}

const DescriptionWithTx: React.FC<React.PropsWithChildren<DescriptionWithTxProps>> = ({ txHash, children }) => {
  const chainId = useActiveChainId()
  const { t } = useTranslation()

  return (
    <>
      {typeof children === 'string' ? <Text as="p">{children}</Text> : children}
      {txHash && (
        <ScanLink icon={<AptosIcon />} href={getBlockExploreLink(txHash, 'transaction', chainId)}>
          {t('View on %site%', { site: 'Explorer' })}: {truncateHash(txHash, 8, 0)}
        </ScanLink>
      )}
    </>
  )
}

export default DescriptionWithTx
