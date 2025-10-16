import { useTranslation } from '@sarcoinswap/localization'
import { Text } from '@sarcoinswap/uikit'

const RugPullWarning = () => {
  const { t } = useTranslation()

  return (
    <>
      <Text>{t('Suspicious rugpull token')}</Text>
    </>
  )
}

export default RugPullWarning
