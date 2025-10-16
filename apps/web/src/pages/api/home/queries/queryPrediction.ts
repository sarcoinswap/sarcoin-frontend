import { ChainId } from '@sarcoinswap/chains'
import { getPredictionConfig } from '@sarcoinswap/prediction'
import { cacheByLRU } from '@sarcoinswap/utils/cacheByLRU'
import { fetchPredictionUsers } from 'state/predictions'
import { getProfile } from 'state/profile/helpers'
import { Profile } from 'state/types'
import { getHomeCacheSettings } from './settings'

export const queryPredictionUser = cacheByLRU(async () => {
  const config = await getPredictionConfig(ChainId.BSC)
  const extra = config?.BNB ?? Object.values(config)?.[0]
  const result = await fetchPredictionUsers(
    {
      address: null,
      orderBy: 'totalBets',
      timePeriod: 'all',
    },
    extra,
  )
  const topUser = result.results
  const user = topUser[0]
  const profile = await getProfile(user.id)
  return {
    user,
    hasRegistered: Boolean(profile?.hasRegistered),
    profile: profile?.profile as Profile,
  }
}, getHomeCacheSettings('prediction-user'))
