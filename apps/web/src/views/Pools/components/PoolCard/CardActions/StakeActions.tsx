import { Token } from '@sarcoinswap/sdk'
import { Pool } from '@sarcoinswap/widgets-internal'
import StakeModal from '../../Modals/StakeModal'

export default Pool.withStakeActions<Token>(StakeModal)
