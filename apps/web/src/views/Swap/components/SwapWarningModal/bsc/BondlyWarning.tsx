import { Text } from '@sarcoinswap/uikit'
import { useTranslation } from '@sarcoinswap/localization'

const BondlyWarning = () => {
  const { t } = useTranslation()

  return <Text>{t('Warning: BONDLY has been compromised. Please remove liquidity until further notice.')}</Text>
}

export default BondlyWarning
