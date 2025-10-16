import { useTranslation } from '@sarcoinswap/localization'
import { Image } from '@sarcoinswap/uikit'
import { Swap } from '@sarcoinswap/widgets-internal'

export const ExchangeLayout = ({ children }: React.PropsWithChildren) => {
  const { t } = useTranslation()
  return (
    <Swap.Page
      helpUrl="https://docs.pancakeswap.finance/get-started-aptos"
      externalText={t('Bridge assets to Aptos Chain')}
      externalLinkUrl="https://bridge.pancakeswap.finance/aptos"
      helpImage={<Image src="/help.png" width={178} height={243} alt="Aptos help" />}
    >
      {children}
    </Swap.Page>
  )
}
