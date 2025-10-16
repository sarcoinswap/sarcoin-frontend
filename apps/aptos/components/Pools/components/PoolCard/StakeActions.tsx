import { Token } from '@sarcoinswap/swap-sdk-core'
import { Pool } from '@sarcoinswap/widgets-internal'
import StakeModal from './StakeModal'

export default Pool.withStakeActions<Token>(StakeModal)
