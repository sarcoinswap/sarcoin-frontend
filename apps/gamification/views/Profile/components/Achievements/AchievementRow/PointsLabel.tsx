import { Flex, FlexProps, PrizeIcon, Text } from '@sarcoinswap/uikit'
import { useTranslation } from '@sarcoinswap/localization'

interface PointsLabelProps extends FlexProps {
  points: number
}

const PointsLabel: React.FC<React.PropsWithChildren<PointsLabelProps>> = ({ points, ...props }) => {
  const { t } = useTranslation()

  return (
    <Flex alignItems="center" {...props}>
      <PrizeIcon mr="4px" color="textSubtle" />
      <Text color="textSubtle">{t('%num% points', { num: points })}</Text>
    </Flex>
  )
}

export default PointsLabel
