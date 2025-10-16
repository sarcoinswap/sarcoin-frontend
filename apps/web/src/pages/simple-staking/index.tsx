import { ChainId } from '@sarcoinswap/chains'
import FixedStaking from 'views/FixedStaking'

const FixedStakingPage = () => {
  return <FixedStaking />
}

FixedStakingPage.chains = [ChainId.BSC]

export default FixedStakingPage
