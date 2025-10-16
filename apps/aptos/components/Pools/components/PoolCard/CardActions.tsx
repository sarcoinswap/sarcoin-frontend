import { Pool } from '@sarcoinswap/widgets-internal'
import { Coin } from '@sarcoinswap/aptos-swap-sdk'
import StakeActions from './StakeActions'
import HarvestActions from './HarvestActions'

export default Pool.withCardActions<Coin>(HarvestActions, StakeActions)
