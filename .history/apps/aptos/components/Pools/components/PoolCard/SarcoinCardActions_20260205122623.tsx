import { Pool } from '@pancakeswap/widgets-internal'
import { Coin } from '@pancakeswap/aptos-swap-sdk'
import SarcoinCollectModal from './SarcoinCollectModal'
import SarcoinStakeModal from './SarcoinStakeModal'

const HarvestActions = Pool.withCollectModalCardAction(SarcoinCollectModal)
const StakeActions = Pool.withStakeActions(SarcoinStakeModal)

export default Pool.withCardActions<Coin>(HarvestActions, StakeActions)
