import { Pool } from '@pancakeswap/widgets-internal'
import { Coin } from '@pancakeswap/aptos-swap-sdk'
import { ConnectWalletButton } from 'components/ConnectWalletButton'

import SarcoinCollectModal from '../PoolCard/SarcoinCollectModal'
import SarcoinStakeModal from '../PoolCard/SarcoinStakeModal'

const StakeActions = Pool.withStakeActions(SarcoinStakeModal)

const StakeActionContainer = Pool.withStakeActionContainer(StakeActions, ConnectWalletButton)

export default Pool.withTableActions<Coin>(Pool.withCollectModalTableAction(SarcoinCollectModal), StakeActionContainer)
