import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | SarcoinSwap',
  defaultTitle: 'Blog | SarcoinSwap',
  description:
    'Cheaper and faster than Uniswap? Discover SarcoinSwap, the leading DEX on BNB Smart Chain (BSC) with the best farms in DeFi and a lottery for SRS.',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@SarcoinSwap',
    site: '@SarcoinSwap',
  },
  openGraph: {
    title: 'SarcoinSwap - A next evolution DeFi exchange on BNB Smart Chain (BSC)',
    description:
      'The most popular AMM on BSC! Earn SRS through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by SarcoinSwap), NFTs, and more, on a platform you can trust.',
    images: [{ url: 'https://sarcoinswap.finance/images/hero.png' }],
  },
}
