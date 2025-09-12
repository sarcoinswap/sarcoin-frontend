import { Protocol } from '@pancakeswap/farms'
import { useIntersectionObserver } from '@pancakeswap/hooks'
import { useTranslation } from '@pancakeswap/localization'
import {
  Button,
  ButtonMenu,
  ButtonMenuItem,
  Dots,
  Flex,
  FlexGap,
  HistoryIcon,
  IconButton,
  Text,
  Toggle,
  useMatchBreakpoints,
  useModal,
} from '@pancakeswap/uikit'
import { Liquidity } from '@pancakeswap/widgets-internal'
import TransactionsModal from 'components/App/Transactions/TransactionsModal'
import { ASSET_CDN } from 'config/constants/endpoints'
import { V3_MIGRATION_SUPPORTED_CHAINS } from 'config/constants/supportChains'
import { useAtom } from 'jotai'
import intersection from 'lodash/intersection'
import NextLink from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { POSITION_STATUS, UnifiedPositionDetail } from 'state/farmsV4/state/accountPositions/type'
import styled from 'styled-components'
import { useAccount } from 'wagmi'

import ConnectWalletButton from 'components/ConnectWalletButton'
import { isInfinityProtocol } from 'utils/protocols'
import { usePoolFeatureAndType } from 'views/AddLiquiditySelector/hooks/usePoolTypeQuery'
import {
  AddLiquidityButton,
  Card,
  IPoolsFilterPanelProps,
  PoolsFilterPanel,
  PositionItemSkeleton,
  CardBody as StyledCardBody,
  CardHeader as StyledCardHeader,
  useSelectedProtocols,
  PositionCard,
} from './components'
import { useFilterToQueries } from './hooks/useFilterToQueries'
import { useInfinityPositions } from './hooks/useInfinityPositions'
import { useV3Positions } from './hooks/useV3Positions'
import { useV2Positions } from './hooks/useV2Positions'
import { useStablePositions } from './hooks/useStablePositions'
import { positionEarningAmountAtom } from './hooks/usePositionEarningAmount'
import { getPositionKey } from './components/PositionItem/PositionCard'
import { matchPositionSearch } from './utils/matchPositionSearch'

const ToggleWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-direction: row;

  ${({ theme }) => theme.mediaQueries.lg} {
    align-items: flex-start;
  }
`
const ButtonWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`

const ControlWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-top: 8px;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: auto;
    justify-content: flex-end;
    margin-top: 0;
  }
`

const CardBody = styled(StyledCardBody)`
  padding: 24px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 24px;
  }

  gap: 8px;
  background: ${({ theme }) => theme.colors.dropdown};
  border-bottom-left-radius: ${({ theme }) => theme.radii.card};
  border-bottom-right-radius: ${({ theme }) => theme.radii.card};
`

const CardHeader = styled(StyledCardHeader)`
  padding-bottom: 0;
`

const StyledButtonMenu = styled(ButtonMenu)<{ $positionStatus: number }>`
  & button {
    padding: 0 12px;
  }
  & button[variant='text']:nth-child(${({ $positionStatus }) => $positionStatus + 1}) {
    color: ${({ theme }) => theme.colors.secondary};
  }

  @media (max-width: 967px) {
    width: 100%;
  }
`

const SubPanel = styled(Flex)`
  padding: 16px;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  row-gap: 16px;
  flex-wrap: wrap;
  border-top: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  margin: 24px -24px 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin: 24px -24px 0;
  }
`

const EmptyListPlaceholder = ({ text, imageUrl }: { text: string; imageUrl?: string }) => {
  const { address: account } = useAccount()

  return (
    <FlexGap alignItems="center" flexDirection="column" gap="16px">
      <img
        width={156}
        height={179}
        alt="empty placeholder"
        src={imageUrl ?? `${ASSET_CDN}/web/universalFarms/empty_list_bunny.png`}
      />
      <Text fontSize="14px" color="textSubtle" textAlign="center">
        {text}
      </Text>
      {!account ? <ConnectWalletButton /> : null}
    </FlexGap>
  )
}

const NUMBER_OF_FARMS_VISIBLE = 10

export const PositionPage = () => {
  const { t } = useTranslation()
  const { address: account } = useAccount()

  const { observerRef, isIntersecting } = useIntersectionObserver()
  const [cursorVisible, setCursorVisible] = useState(NUMBER_OF_FARMS_VISIBLE)
  const { replaceURLQueriesByFilter, ...filters } = useFilterToQueries()
  const { isMobile, isMd } = useMatchBreakpoints()

  const { selectedProtocolIndex, selectedNetwork, selectedTokens, positionStatus, farmsOnly, search } = filters

  const poolsFilter = useMemo(
    () => ({
      selectedProtocolIndex,
      selectedNetwork,
      selectedTokens,
      search,
    }),
    [selectedProtocolIndex, selectedNetwork, selectedTokens, search],
  )
  const selectedPoolTypes = useSelectedProtocols(selectedProtocolIndex)
  const [onPresentTransactionsModal] = useModal(<TransactionsModal />)

  const setPositionStatus = useCallback(
    (status: POSITION_STATUS) => {
      replaceURLQueriesByFilter({
        ...filters,
        positionStatus: status,
      })
    },
    [filters, replaceURLQueriesByFilter],
  )

  const toggleFarmsOnly = useCallback(() => {
    replaceURLQueriesByFilter({
      ...filters,
      farmsOnly: !farmsOnly,
    })
  }, [filters, farmsOnly, replaceURLQueriesByFilter])

  const handleFilterChange: IPoolsFilterPanelProps['onChange'] = useCallback(
    (newFilters) => {
      replaceURLQueriesByFilter({
        ...filters,
        ...newFilters,
      })
    },
    [filters, replaceURLQueriesByFilter],
  )

  const { infinityPositions, infinityLoading, allInfinityPositions } = useInfinityPositions({
    selectedNetwork,
    selectedTokens,
    positionStatus,
    farmsOnly,
  })
  const { v3Positions, v3Loading, v3PoolsLength } = useV3Positions({
    selectedNetwork,
    selectedTokens,
    positionStatus,
    farmsOnly,
  })
  const { v2Positions, v2Loading, v2PoolsLength } = useV2Positions({
    selectedNetwork,
    selectedTokens,
    positionStatus,
    farmsOnly,
  })
  const { stablePositions, stableLoading } = useStablePositions({
    selectedNetwork,
    selectedTokens,
    positionStatus,
    farmsOnly,
  })

  const allPositionList = useMemo(() => {
    const unifiedList = [
      ...infinityPositions,
      ...v3Positions,
      ...v2Positions,
      ...stablePositions,
    ] as UnifiedPositionDetail[]
    return unifiedList
      .filter((item) => {
        const { protocol } = item
        return selectedPoolTypes.includes(protocol)
      })
      .filter((item) => matchPositionSearch(item, search))
  }, [infinityPositions, v3Positions, v2Positions, stablePositions, selectedPoolTypes, search])

  const visibleList = useMemo(() => {
    return allPositionList.slice(0, cursorVisible)
  }, [allPositionList, cursorVisible])

  const mainSection = useMemo(() => {
    if (!account) {
      return <EmptyListPlaceholder text={t('Please Connect Wallet to view positions.')} />
    }

    const isAnyLoading = infinityLoading || v3Loading || v2Loading || stableLoading
    const isAllLoading = infinityLoading && v3Loading && v2Loading && stableLoading

    if (isAllLoading) {
      return (
        <>
          <PositionItemSkeleton />
          <Text color="textSubtle" textAlign="center">
            <Dots>{t('Loading')}</Dots>
          </Text>
        </>
      )
    }

    if (!isAnyLoading && !visibleList.length) {
      return <EmptyListPlaceholder text={t('Empty page: No results found.')} />
    }

    return (
      <>
        {isAnyLoading && (
          <>
            <PositionItemSkeleton />
            <Text color="textSubtle" textAlign="center">
              <Dots>{t('Loading')}</Dots>
            </Text>
          </>
        )}
        {visibleList.map((pos) => (
          <PositionCard
            key={getPositionKey(pos)}
            data={pos}
            poolLength={
              pos.protocol === Protocol.V3
                ? v3PoolsLength[pos.chainId]
                : pos.protocol === Protocol.V2
                ? v2PoolsLength[pos.pair.chainId]
                : undefined
            }
            allInfinityPositions={allInfinityPositions}
          />
        ))}
      </>
    )
  }, [
    account,
    infinityLoading,
    v3Loading,
    v2Loading,
    stableLoading,
    visibleList,
    t,
    v3PoolsLength,
    v2PoolsLength,
    allInfinityPositions,
  ])

  useEffect(() => {
    if (isIntersecting) {
      setCursorVisible((numberCurrentlyVisible) => {
        if (Array.isArray(allPositionList) && numberCurrentlyVisible <= allPositionList.length) {
          return Math.min(numberCurrentlyVisible + NUMBER_OF_FARMS_VISIBLE, allPositionList.length)
        }
        return numberCurrentlyVisible
      })
    }
  }, [isIntersecting, mainSection, allPositionList.length])

  const [, setPositionEarningAmount] = useAtom(positionEarningAmountAtom)
  useEffect(() => {
    // clear position earning data when account update
    setPositionEarningAmount({})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  return (
    <Card>
      <CardHeader p={isMobile ? '16px' : undefined}>
        <PoolsFilterPanel onChange={handleFilterChange} value={poolsFilter}>
          {(isMobile || isMd) && <AddLiquidityButton scale="sm" height="40px" width="100%" />}
          {isMobile ? (
            <ControlWrapper>
              <ToggleWrapper>
                <Text>{t('Farms only')}</Text>
                <Toggle checked={farmsOnly} onChange={toggleFarmsOnly} scale="sm" />
              </ToggleWrapper>
              <ButtonWrapper>
                <IconButton onClick={onPresentTransactionsModal} variant="text" scale="xs">
                  <HistoryIcon color="textSubtle" width="24px" />
                </IconButton>
              </ButtonWrapper>
            </ControlWrapper>
          ) : null}
        </PoolsFilterPanel>
        <SubPanel>
          <StyledButtonMenu
            $positionStatus={positionStatus}
            activeIndex={positionStatus}
            onItemClick={setPositionStatus}
            variant="text"
            scale="sm"
          >
            <ButtonMenuItem>{t('All')}</ButtonMenuItem>
            <ButtonMenuItem>{t('Active')}</ButtonMenuItem>
            <ButtonMenuItem>{t('Inactive')}</ButtonMenuItem>
            <ButtonMenuItem>{t('Closed')}</ButtonMenuItem>
          </StyledButtonMenu>
          {!isMobile ? (
            <ControlWrapper>
              <ToggleWrapper>
                <Text>{t('Farms only')}</Text>
                <Toggle checked={farmsOnly} onChange={toggleFarmsOnly} scale="sm" />
              </ToggleWrapper>
              <ButtonWrapper>
                <IconButton onClick={onPresentTransactionsModal} variant="text" scale="xs">
                  <HistoryIcon color="textSubtle" width="24px" />
                </IconButton>
              </ButtonWrapper>
            </ControlWrapper>
          ) : null}
          {/* <ButtonContainer>
            <NextLink href={LIQUIDITY_PAGES.infinity.ADD_LIQUIDITY_SELECT}>
              <Button endIcon={<AddIcon color="invertedContrast" />} scale="sm" style={{ whiteSpace: 'nowrap' }}>
                {t('Add Liquidity')}
              </Button>
            </NextLink>
          </ButtonContainer> */}
        </SubPanel>
      </CardHeader>
      <CardBody>
        {mainSection}
        {selectedPoolTypes.length === 1 && selectedPoolTypes.includes(Protocol.V2) ? (
          <Liquidity.FindOtherLP>
            {!!intersection(V3_MIGRATION_SUPPORTED_CHAINS, selectedNetwork).length && (
              <NextLink style={{ marginTop: '8px' }} href="/migration">
                <Button id="migration-link" variant="secondary" scale="sm">
                  {t('Migrate to V3')}
                </Button>
              </NextLink>
            )}
          </Liquidity.FindOtherLP>
        ) : null}
        {Array.isArray(visibleList) && visibleList.length > 0 && <div ref={observerRef} />}
      </CardBody>
    </Card>
  )
}
