import type { TranslateFunction } from '@sarcoinswap/localization'

export type FAQConfig = (t: TranslateFunction) => {
  title: string
  imageUrl: string
  alt: string
  docsUrl: string
  data: Array<{ title: string; content: React.ReactNode }>

  subtitle?: string
}
export type ConfigType = 'swap' | 'prediction' | 'buyCrypto'
