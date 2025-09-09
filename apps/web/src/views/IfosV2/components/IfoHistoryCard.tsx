import { useState } from 'react'
import { Box, Card, CardBody, CardHeader, ExpandableButton, FlexGap } from '@pancakeswap/uikit'
import { styled } from 'styled-components'
import { IfoRibbon } from './IfoCards/IfoRibbon'
import { IfoSaleInfoDisplay } from './IfoCards/IfoSaleInfoCard'
import IfoPoolInfoDisplay from './IfoCards/IfoPoolInfoDisplay'
import { IfoAllocationDisplay } from './IfoAllocationCard'
import useIfo from '../hooks/useIfo'
import { useIFOStatus } from '../hooks/ifo/useIFOStatus'
import { ClaimDisplay } from './IfoCards/ClaimDisplay'

const StyledCard = styled(Card)`
  width: 100%;
  margin: auto;
  border-radius: 32px;
`

const Header = styled(CardHeader)<{ $bannerUrl: string }>`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 112px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: ${({ theme }) => theme.colors.dropdown};
  background-image: ${({ $bannerUrl }) => `url('${$bannerUrl}')`};
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
`

const IfoHistoryCard: React.FC = () => {
  const [expanded, setExpanded] = useState(false)
  const { config, info, pools } = useIfo()
  const [ifoStatus0] = useIFOStatus()

  const pool0 = pools?.[0]

  const symbol = info?.offeringCurrency?.symbol ?? ''
  const tokenAddress = info?.offeringCurrency?.wrapped.address ?? ''
  const tokenDecimals = info?.offeringCurrency?.decimals ?? 18
  const saleAmount = pool0?.saleAmount?.toSignificant(6)
  if (info?.status !== 'finished') {
    return null
  }

  return (
    <StyledCard mb="24px">
      <Box position="relative">
        <Header $bannerUrl={config?.bannerUrl || ''}>
          <ExpandableButton expanded={expanded} onClick={() => setExpanded((prev) => !prev)} />
        </Header>
        {expanded && <IfoRibbon />}
      </Box>
      {expanded && (
        <CardBody p="24px">
          <FlexGap flexDirection="column" gap="16px">
            <IfoSaleInfoDisplay />
            <IfoAllocationDisplay
              symbol={symbol}
              tokenAddress={tokenAddress}
              tokenDecimals={tokenDecimals}
              allocatedAmount={saleAmount}
            />
            <ClaimDisplay pid={0} />
            <IfoPoolInfoDisplay pid={0} ifoStatus={ifoStatus0} variant="history" />
          </FlexGap>
        </CardBody>
      )}
    </StyledCard>
  )
}

export default IfoHistoryCard
