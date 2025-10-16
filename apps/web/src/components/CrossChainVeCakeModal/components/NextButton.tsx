import { useTranslation } from '@sarcoinswap/localization'
import { Button, ButtonProps } from '@sarcoinswap/uikit'
import { useState } from 'react'
import { SwitchToBnbChainModal } from './SwitchToBnbCahinModal'

export const NextButton: React.FC<ButtonProps> = (props) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button width="50%" onClick={() => setIsOpen(true)} {...props}>
        {t('Next.step')}
      </Button>
      <SwitchToBnbChainModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onDismiss={() => {
          setIsOpen(false)
        }}
      />
    </>
  )
}
