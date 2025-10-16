import { useTranslation } from '@sarcoinswap/localization'
import { Button, CheckmarkCircleIcon, Flex, Text } from '@sarcoinswap/uikit'

interface FinishedProps {
  title: string
  closeModal: () => void
}

export const Finished: React.FC<React.PropsWithChildren<FinishedProps>> = ({ title, closeModal, children }) => {
  const { t } = useTranslation()

  return (
    <Flex width="100%" flexDirection="column">
      <CheckmarkCircleIcon width={64} height={64} color="primary" margin="auto auto 24px auto" />
      {children}
      <Text textAlign="center" color="textSubtle" mt="20px">
        {title}
      </Text>
      <Button mt="24px" width="100%" onClick={closeModal}>
        {t('Nice!')}
      </Button>
    </Flex>
  )
}
