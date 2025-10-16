import { useTranslation } from '@sarcoinswap/localization'
import { Box, Image, Link } from '@sarcoinswap/uikit'
import truncateHash from '@sarcoinswap/utils/truncateHash'
import { solanaExplorerAtom } from '@sarcoinswap/utils/user'
import { SwapTransactionReceiptModalContent } from '@sarcoinswap/widgets-internal'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'

export const SolanaSwapTxReceiptModalContent = ({ txHash }: { txHash: string }) => {
  const { t } = useTranslation()
  const explorer = useAtomValue(solanaExplorerAtom)

  const explorerLink = useMemo(() => {
    return `${explorer.host}/tx/${txHash}`
  }, [txHash, explorer.host])

  return (
    <SwapTransactionReceiptModalContent
      explorerLink={
        <Link external small href={explorerLink}>
          {t('View on %site%', { site: explorer.name })}: {truncateHash(txHash, 8, 0)}
          <Box ml="4px" height={18} width={18}>
            <Image src={explorer.icon} height={18} width={18} alt={explorer.name} />
          </Box>
        </Link>
      }
    >
      {null}
    </SwapTransactionReceiptModalContent>
  )
}
