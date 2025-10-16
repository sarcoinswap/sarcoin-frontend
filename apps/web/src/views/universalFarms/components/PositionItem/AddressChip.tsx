import { useTranslation } from '@sarcoinswap/localization'
import { CopyButton, FlexGap, FlexProps, Text, TextProps } from '@sarcoinswap/uikit'
import truncateHash from '@sarcoinswap/utils/truncateHash'

export type AddressChipProps = {
  address: string
  label?: React.ReactNode
  textProps?: TextProps
  truncateNumber?: number
} & FlexProps

export const AddressChip: React.FC<AddressChipProps> = ({
  address,
  label,
  textProps,
  truncateNumber = 6,
  ...props
}) => {
  const truncatedAddress = truncateNumber ? truncateHash(address, truncateNumber) : address
  const { t } = useTranslation()
  return (
    <FlexGap alignItems="center" gap="2px" {...props}>
      {label}
      <Text {...textProps}>{truncatedAddress}</Text>
      <CopyButton
        width="16px"
        color="textSubtle"
        text={address}
        tooltipMessage={t('Copied')}
        style={{ marginBottom: '-2px' }}
      />
    </FlexGap>
  )
}
