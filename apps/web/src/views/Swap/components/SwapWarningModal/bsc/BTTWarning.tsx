import { useTranslation, Trans } from '@sarcoinswap/localization'
import { Box, Text, Link, LinkExternal } from '@sarcoinswap/uikit'

const BTTWarning = () => {
  const { t } = useTranslation()

  return (
    <Box maxWidth="380px">
      <Text>
        {t(
          'Please note that this is the old BTT token, which has been swapped to the new BTT tokens in the following ratio:',
        )}
      </Text>
      <Text>1 BTT (OLD) = 1,000 BTT (NEW)</Text>
      <Text mb="8px">
        <Trans
          i18nKey="Trade the new BTT token <0>here</0>"
          components={[
            <Link
              style={{ display: 'inline' }}
              href="/swap?outputCurrency=0x352Cb5E19b12FC216548a2677bD0fce83BaE434B"
            />,
          ]}
        />
      </Text>
      <LinkExternal href="https://medium.com/@BitTorrent/tutorial-how-to-swap-bttold-to-btt-453264d7142">
        {t('For more details on the swap, please refer here.')}
      </LinkExternal>
    </Box>
  )
}

export default BTTWarning
