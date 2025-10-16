import { useTranslation, Trans } from '@sarcoinswap/localization'
import { Grid, Link, Modal, ModalV2, Text } from '@sarcoinswap/uikit'
import { useQuery } from '@tanstack/react-query'
import { WALLET_API } from 'config/constants/endpoints'
import { UpdatePositionsReminder } from 'views/Farms/components/UpdatePositionsReminder'
import { useAccount } from 'wagmi'
import ListsUpdater from './state/lists/updater'
import MulticallUpdater from './state/multicall/updater'
import TransactionUpdater, { SolanaTransactionUpdater } from './state/transactions/updater'
import { chains } from './utils/wagmi'

export function Updaters() {
  return (
    <>
      <UpdatePositionsReminder />
      <ListsUpdater />
      {chains.map((chain) => (
        <TransactionUpdater key={`trxUpdater#${chain.id}`} chainId={chain.id} />
      ))}
      <SolanaTransactionUpdater />
      <MulticallUpdater />
    </>
  )
}

export function Blocklist() {
  const { address } = useAccount()
  const { t } = useTranslation()

  const { data } = useQuery({
    queryKey: ['blocklist', address],
    enabled: Boolean(address),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,

    queryFn: async ({ signal }) => {
      const result = await fetch(`${WALLET_API}/v0/screen/address/${address}`, {
        signal,
      })
        .then((res) => res.json() as Promise<{ result: boolean }>)
        .catch(() => ({ result: true }))
      return result.result
    },
  })

  const blocked = data === false

  if (blocked) {
    return (
      <ModalV2 isOpen closeOnOverlayClick={false} disableOutsidePointerEvents>
        <Modal title={t('Blocked address')} hideCloseButton>
          <Grid style={{ gap: '16px' }} maxWidth={['100%', null, '400px']}>
            <Text style={{ wordBreak: 'break-word' }}>{address}</Text>
            <Text>
              <Trans
                i18nKey="We have detected that this address is associated with a Prohibited Activity <0>Learn more</0>"
                components={[
                  <Link
                    style={{ display: 'inline-block' }}
                    href="https://pancakeswap.finance/terms-of-service"
                    external
                  />,
                ]}
              />
            </Text>
            <Text>
              <Trans
                i18nKey="If you believe that your address has been misclassified, please email <0>info@sarcoinswap.com</0>"
                components={[<Link style={{ display: 'inline-block' }} href="mailto:info@sarcoinswap.com" />]}
              />
            </Text>
          </Grid>
        </Modal>
      </ModalV2>
    )
  }

  return null
}
