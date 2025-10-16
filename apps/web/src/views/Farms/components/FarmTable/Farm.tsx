import { useTranslation } from '@sarcoinswap/localization'
import { zksyncTokens } from '@sarcoinswap/tokens'
import { Box, Flex, Link, Text } from '@sarcoinswap/uikit'
import { FarmWidget } from '@sarcoinswap/widgets-internal'
import { GiftTooltip } from 'components/GiftTooltip/GiftTooltip'
import { TokenPairImage } from 'components/TokenImage'
import { USDPlusWarningTooltip } from 'components/USDPlusWarningTooltip'
import { useMemo } from 'react'
import { isAddressEqual } from 'utils'
import { Address } from 'viem'
import { bsc } from 'viem/chains'
import { useHasCustomFarmLpTooltips } from 'views/Farms/hooks/useHasCustomFarmLpTooltips'

const { FarmTokenInfo } = FarmWidget.FarmTable

export const FarmCell: React.FunctionComponent<
  React.PropsWithChildren<
    FarmWidget.FarmTableFarmTokenInfoProps & { chainId?: number; lpAddress?: Address; version: 2 | 3 }
  >
> = ({
  token,
  quoteToken,
  label,
  pid,
  isReady,
  isStaking,
  lpAddress,
  chainId,
  merklLink,
  hasBothFarmAndMerkl,
  merklUserLink,
  incentraLink,
  incentraUserLink,
}) => {
  const { t } = useTranslation()
  const customTooltips = useHasCustomFarmLpTooltips(lpAddress)

  const hasUsdPlusWarning = useMemo(() => {
    return zksyncTokens.usdPlus.equals(token) || zksyncTokens.usdPlus.equals(quoteToken)
  }, [token, quoteToken])

  return (
    <Flex alignItems="center">
      <FarmTokenInfo
        pid={pid}
        label={label}
        token={token}
        quoteToken={quoteToken}
        isReady={isReady}
        isStaking={isStaking}
        hasBothFarmAndMerkl={hasBothFarmAndMerkl}
        merklLink={merklLink}
        merklUserLink={merklUserLink}
        incentraLink={incentraLink}
        incentraUserLink={incentraUserLink}
      >
        <TokenPairImage width={40} height={40} variant="inverted" primaryToken={token} secondaryToken={quoteToken} />
      </FarmTokenInfo>
      {chainId === bsc.id && lpAddress && isAddressEqual(lpAddress, '0xdD82975ab85E745c84e497FD75ba409Ec02d4739') ? (
        <GiftTooltip>
          <Box>
            <Text lineHeight="110%" as="span">
              {t('Stake CAKE, Earn PEPE in our')}
              <Link ml="4px" lineHeight="110%" display="inline !important" href="/pools?chain=bsc" external>
                PEPE Syrup Pool
              </Link>
              .
            </Text>
            <br />
            <br />
            <Text lineHeight="110%" as="span">
              {t(
                "If more PEPE-BNB LP is deposited in our Farm, we'll increase rewards for the PEPE Syrup Pool next month",
              )}
            </Text>
            .
          </Box>
        </GiftTooltip>
      ) : null}
      {customTooltips && <Box marginLeft={1}>{customTooltips.tooltips}</Box>}
      {hasUsdPlusWarning ? <USDPlusWarningTooltip /> : null}
    </Flex>
  )
}
