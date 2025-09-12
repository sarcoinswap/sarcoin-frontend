import { useTranslation } from '@pancakeswap/localization'
import { Currency } from '@pancakeswap/sdk'
import { Skeleton, Table, Td, Th, Text } from '@pancakeswap/uikit'
import orderBy from 'lodash/orderBy'
import times from 'lodash/times'
import { useEffect, useState } from 'react'
import { getBetHistory, transformBetResponse } from 'state/predictions/helpers'
import { Bet } from 'state/types'
import { getNetPayout } from 'views/Predictions/components/History/helpers'
import { BetPosition, REWARD_RATE } from '@pancakeswap/prediction'
import PositionLabel from './PositionLabel'
import { NetWinningsView } from './Results/styles'

interface PreviousBetsTableProps {
  numberOfBets?: number
  account: string
  token: Currency | undefined
  api: string
}

const PreviousBetsTable: React.FC<React.PropsWithChildren<PreviousBetsTableProps>> = ({
  numberOfBets = 5,
  account,
  token,
  api,
}) => {
  const [isFetching, setIsFetching] = useState(false)
  const [bets, setBets] = useState<Bet[]>([])
  const { t } = useTranslation()
  const orderedBets = orderBy(bets, ['round.epoch'], ['desc'])

  useEffect(() => {
    const fetchBetHistory = async () => {
      setIsFetching(true)
      try {
        if (token?.symbol) {
          const response = await getBetHistory(
            {
              user: account.toLowerCase(),
            },
            numberOfBets,
            undefined,
            api,
            token?.symbol,
          )

          const transformer = transformBetResponse(token?.symbol, token?.chainId)

          setBets(response.map(transformer))
        }
      } finally {
        setIsFetching(false)
      }
    }

    fetchBetHistory()
  }, [account, numberOfBets, setIsFetching, setBets, api, token])

  return (
    <Table>
      <thead>
        <tr>
          <Th>{t('Round')}</Th>
          <Th>{t('Direction')}</Th>
          <Th textAlign="right">{t('Winnings (%symbol%)', { symbol: token?.symbol })}</Th>
        </tr>
      </thead>
      <tbody>
        {isFetching
          ? times(numberOfBets).map((num) => (
              <tr key={num}>
                <Td>
                  <Skeleton width="80px" />
                </Td>
                <Td>
                  <Skeleton width="60px" height="32px" />
                </Td>
                <Td>
                  <Skeleton width="80px" />
                </Td>
              </tr>
            ))
          : orderedBets.map((bet) => {
              const isCancelled = bet?.round?.failed
              const isWinner = bet.position === bet?.round?.position
              const { claimed } = bet

              // If unclaimed, calculate the payout
              const payout =
                !isCancelled && isWinner ? (claimed ? bet.claimedNetBNB : getNetPayout(bet, REWARD_RATE)) : bet.amount

              // Somehow when round is live, the bet.round.position is "House", so check closePrice instead
              const isHouseWin =
                bet.round && Boolean(bet.round.closePrice) && bet?.round?.position === BetPosition.HOUSE

              return (
                <tr key={bet.id}>
                  <Td textAlign="center" fontWeight="bold">
                    {bet?.round?.epoch}
                  </Td>
                  <Td textAlign="center">
                    {isCancelled ? (
                      <Text color="textSubtle" bold>
                        {t('Cancelled')}
                      </Text>
                    ) : isHouseWin ? (
                      <Text color="textSubtle" bold>
                        {t('To Burn')}
                      </Text>
                    ) : (
                      <PositionLabel position={bet.position} />
                    )}
                  </Td>
                  <Td textAlign="right">
                    <NetWinningsView
                      token={token}
                      amount={payout}
                      textPrefix={isCancelled || payout < 0 ? '' : isWinner ? '+' : '-'}
                      textColor={isCancelled || payout < 0 ? 'textSubtle' : isWinner ? 'success' : 'failure'}
                    />
                  </Td>
                </tr>
              )
            })}
      </tbody>
    </Table>
  )
}

export default PreviousBetsTable
