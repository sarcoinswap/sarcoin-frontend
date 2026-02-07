import useSWRImmutable from 'swr/immutable'

export const useSarcoinPrice = () => {
  return useSWRImmutable(
    ['sarcoin-usd-price'],
    async () => {
      const sarcoin = await (await fetch('https://farms-api.sarcoinswap.com/price/sarcoin')).json()
      return sarcoin.price as string
    },
    {
      refreshInterval: 1_000 * 10,
    },
  )
}
