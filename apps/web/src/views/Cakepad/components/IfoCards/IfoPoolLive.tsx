import { useTranslation } from '@pancakeswap/localization'
import { AddIcon, Button, FlexGap, Text } from '@pancakeswap/uikit'
import { CurrencyLogo } from '@pancakeswap/widgets-internal'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/router'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useStablecoinPriceAmount } from 'hooks/useStablecoinPrice'
import { logGTMIfoConnectWalletEvent } from 'utils/customGTMEventTracking'
import { CAKEPAD_DEPOSIT_URL } from 'views/Cakepad/config/routes'
import type { IFOStatus } from '../../hooks/ifo/useIFOStatus'
import useIfo from '../../hooks/useIfo'
import IfoPoolInfoDisplay from './IfoPoolInfoDisplay'
import { formatDollarAmount } from './IfoDepositForm'

export const IfoPoolLive: React.FC<{ pid: number; ifoStatus: IFOStatus }> = ({ ifoStatus, pid }) => {
  const { info } = useIfo()
  const status = info?.status
  const isComingSoon = status === 'coming_soon'
  if (isComingSoon) {
    return null
  }

  return (
    <FlexGap flexDirection="column" gap="8px">
      <PoolAction pid={pid} />
      <IfoPoolInfoDisplay pid={pid} ifoStatus={ifoStatus} variant="live" />
    </FlexGap>
  )
}

const PoolAction: React.FC<{ pid: number }> = ({ pid }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { config, info, pools, users } = useIfo()
  const status = info?.status
  const isComingSoon = status === 'coming_soon'
  const poolInfo = pools?.[pid]
  const userStatus = users[pid]
  const stakedAmount = userStatus?.stakedAmount
  const stakeCurrency = stakedAmount?.currency ?? poolInfo?.stakeCurrency
  const ifoId = config?.id
  const userHasStaked = stakedAmount?.greaterThan(0)
  const { address: account } = useAccount()
  const amountInDollar = useStablecoinPriceAmount(
    stakeCurrency ?? undefined,
    stakedAmount !== undefined && Number.isFinite(+stakedAmount.toSignificant(6))
      ? +stakedAmount.toSignificant(6)
      : undefined,
    {
      enabled: Boolean(stakedAmount !== undefined && Number.isFinite(+stakedAmount.toSignificant(6))),
    },
  )
  if (isComingSoon) {
    return null
  }

  const handleDepositClick = () => {
    if (ifoId) {
      const { ifo, ...restQuery } = router.query
      router.push({
        pathname: `${CAKEPAD_DEPOSIT_URL}/[ifoId]/[poolIndex]`,
        query: { ifoId, poolIndex: pid, ...restQuery },
      })
    }
  }

  const handleConnectWallet = () => {
    logGTMIfoConnectWalletEvent(isComingSoon)
  }

  if (userHasStaked) {
    return (
      <FlexGap gap="8px" justifyContent="space-between" alignItems="center">
        <FlexGap flexDirection="column">
          <FlexGap gap="8px" alignItems="center">
            {stakeCurrency && <CurrencyLogo currency={stakeCurrency} size="24px" />}
            <Text fontSize="12px" bold color="secondary" lineHeight="18px" textTransform="uppercase">
              {stakeCurrency?.symbol} {t('Pool')} {t('Deposited')}
            </Text>
          </FlexGap>
          <Text fontSize="20px" bold lineHeight="30px">
            {stakedAmount?.toSignificant(6)}
          </Text>
          {Number.isFinite(amountInDollar) && (
            <Text fontSize="14px" color="textSubtle">
              {`~${amountInDollar && formatDollarAmount(amountInDollar)} USD`}
            </Text>
          )}
        </FlexGap>
        <Button
          variant="secondary"
          scale="sm"
          onClick={handleDepositClick}
          disabled={status !== 'live'}
          style={{ height: '40px' }}
          padding="11px 12px 13px 12px"
        >
          <AddIcon color="primary" />
        </Button>
      </FlexGap>
    )
  }

  return (
    <>
      <Text fontSize="12px" bold color="secondary" lineHeight="18px" textTransform="uppercase">
        {stakeCurrency?.symbol} {t('Pool')}
      </Text>
      <FlexGap alignItems="center" width="100%" gap="8px">
        <CurrencyLogo currency={stakeCurrency} size="40px" />
        {!account ? (
          <ConnectWalletButton scale="sm" onClickCapture={handleConnectWallet} style={{ marginLeft: 'auto' }} />
        ) : (
          <Button
            scale="sm"
            onClick={handleDepositClick}
            style={{
              height: '40px',
              flex: 1,
            }}
            disabled={status !== 'live'}
          >
            {t('Deposit %symbol%', { symbol: stakeCurrency?.symbol })}
          </Button>
        )}
      </FlexGap>
    </>
  )
}

export default IfoPoolLive
