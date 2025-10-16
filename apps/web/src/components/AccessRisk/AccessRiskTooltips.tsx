import { ChainId } from '@sarcoinswap/chains'
import { useTranslation, Trans } from '@sarcoinswap/localization'
import { Flex, Link, Text } from '@sarcoinswap/uikit'
import { TOKEN_RISK } from 'components/AccessRisk'
import { useActiveChainId } from 'hooks/useActiveChainId'

interface AccessRiskTooltipsProps {
  riskLevel?: number
  hasResult?: boolean
  tokenAddress?: string
  riskLevelDescription?: string
}

const AccessRiskTooltips: React.FC<AccessRiskTooltipsProps> = ({
  riskLevel,
  hasResult,
  riskLevelDescription,
  tokenAddress,
}) => {
  const { t } = useTranslation()
  const { chainId } = useActiveChainId()

  if (riskLevel === TOKEN_RISK.UNKNOWN || !hasResult) {
    return (
      <>
        <Text my="8px">
          {t(
            'Risk scanning is still in progress. It may take up to 5 minutes to fully scan a token which is new to the database.',
          )}
        </Text>
        <Trans
          i18nKey="Provided by <0>HashDit</0>"
          components={[<Link style={{ display: 'inline' }} ml="4px" external href="https://www.hashdit.io" />]}
        />
        <Flex mt="4px">
          <Trans
            i18nKey="Learn more about risk rating <0>here.</0>"
            components={[
              <Link ml="4px" external href="https://hashdit.github.io/hashdit/docs/risk-level-description" />,
            ]}
          />
        </Flex>
      </>
    )
  }

  if (hasResult && riskLevel && riskLevel >= TOKEN_RISK.VERY_LOW && tokenAddress) {
    return (
      <>
        <Text my="8px">{riskLevelDescription}</Text>
        <Trans
          i18nKey="Risk scan results are provided by a third party, <0>HashDit</0>"
          components={[<Link style={{ display: 'inline' }} ml="4px" external href="https://www.hashdit.io" />]}
        />
        {chainId === ChainId.BSC && (
          <Flex mt="4px">
            <Trans
              i18nKey="Get more details from <0>RedAlarm</0>"
              components={[
                <Link ml="4px" external href={`https://dappbay.bnbchain.org/risk-scanner/${tokenAddress}`} />,
              ]}
            />
          </Flex>
        )}
      </>
    )
  }

  return (
    <>
      <Text my="8px">
        {t(
          'Automatic risk scanning for the selected token. This scanning result is for reference only, and should NOT be taken as investment advice.',
        )}
      </Text>
      <Trans
        i18nKey="Provided by <0>HashDit</0>"
        components={[<Link style={{ display: 'inline' }} ml="4px" external href="https://www.hashdit.io" />]}
      />
      <Link mt="4px" external href="https://hashdit.github.io/hashdit/docs/risk-level-description">
        {t('Learn More')}
      </Link>
    </>
  )
}

export default AccessRiskTooltips
