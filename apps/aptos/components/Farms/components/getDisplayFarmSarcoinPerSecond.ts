export const getDisplayFarmSarcoinPerSecond = (poolWeight?: number, sarcoinPerBlock?: string) => {
  if (!poolWeight || !sarcoinPerBlock) return '0'

  const farmSarcoinPerSecond = (poolWeight * Number(sarcoinPerBlock)) / 1e8

  return farmSarcoinPerSecond < 0.000001 ? '<0.000001' : `~${farmSarcoinPerSecond.toFixed(6)}`
}
