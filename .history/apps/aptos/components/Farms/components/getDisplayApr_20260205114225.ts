export const getDisplayApr = (sarcoinRewardsApr?: number, lpRewardsApr?: number) => {
  if (sarcoinRewardsApr && lpRewardsApr) {
    return (sarcoinRewardsApr + lpRewardsApr).toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  if (sarcoinRewardsApr) {
    return sarcoinRewardsApr.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  return null
}
