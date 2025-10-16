import { Currency } from '@sarcoinswap/sdk'
import { Box } from '@sarcoinswap/uikit'
import { PredictionUser } from 'state/types'
import MobileRow from './MobileRow'

interface MobileResultsProps {
  results: PredictionUser[]
  token: Currency | undefined
  api: string
}

const MobileResults: React.FC<React.PropsWithChildren<MobileResultsProps>> = ({ results, token, api }) => {
  return (
    <Box mb="24px">
      {results.map((result, index) => (
        <MobileRow key={result.id} rank={index + 4} user={result} token={token} api={api} />
      ))}
    </Box>
  )
}

export default MobileResults
