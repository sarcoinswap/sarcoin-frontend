import { useTranslation } from '@sarcoinswap/localization'
import { Breadcrumbs, Button, CopyButton, Flex, CopyIcon, Text, useMatchBreakpoints } from '@sarcoinswap/uikit'
import { NextLinkFromReactRouter } from '@sarcoinswap/widgets-internal'
import { NextSeo } from 'next-seo'
import { usePoolCurrencies } from '../hooks/usePoolCurrencies'

export const BreadcrumbNav: React.FC = () => {
  const { t } = useTranslation()
  const { poolSymbol } = usePoolCurrencies()
  const { isMobile } = useMatchBreakpoints()

  if (!poolSymbol || poolSymbol === ' / ') return null

  return (
    <>
      <NextSeo title={t('%poolSymbol% position | PancakeSwap', { poolSymbol })} />

      <Flex justifyContent="space-between">
        <Breadcrumbs mb="32px">
          <NextLinkFromReactRouter to="/liquidity/pools">
            <Text color="primary60">{t('Farms')}</Text>
          </NextLinkFromReactRouter>
          <Flex>
            <Text mr="8px">{poolSymbol}</Text>
          </Flex>
        </Breadcrumbs>

        <Button variant="secondary">
          <CopyButton
            text={typeof window !== 'undefined' ? window.location.href : ''}
            tooltipMessage={t('Link copied!')}
            width="16px"
            ml="8px"
            icon={CopyIcon}
          >
            {isMobile ? t('Copy') : t('Copy share link')}
          </CopyButton>
        </Button>
      </Flex>
    </>
  )
}
