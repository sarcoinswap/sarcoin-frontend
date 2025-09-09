import {
  BscScanIcon,
  FlexGap,
  LanguageIcon,
  Link,
  TelegramIcon,
  TwitterIcon,
  useMatchBreakpoints,
} from '@pancakeswap/uikit'
import useTheme from 'hooks/useTheme'
import useIfo from '../hooks/useIfo'

const FooterIcons: React.FC = () => {
  const { theme } = useTheme()
  const { ifoContract, config } = useIfo()
  const { isMobile } = useMatchBreakpoints()

  return (
    <FlexGap gap="12px" justifyContent={isMobile ? 'center' : 'flex-end'}>
      <Link href={config?.projectUrl} target="_blank" rel="noopener noreferrer">
        <LanguageIcon width="24px" color={theme.colors.textSubtle} />
      </Link>
      <Link href={`https://bscscan.com/address/${ifoContract?.address}`} target="_blank" rel="noopener noreferrer">
        <BscScanIcon width="24px" color={theme.colors.textSubtle} />
      </Link>
      {config?.twitterLink && (
        <Link href={config.twitterLink} target="_blank" rel="noopener noreferrer">
          <TwitterIcon width="24px" color={theme.colors.textSubtle} />
        </Link>
      )}
      {config?.tgLink && (
        <Link href={config.tgLink} target="_blank" rel="noopener noreferrer">
          <TelegramIcon width="24px" color={theme.colors.textSubtle} />
        </Link>
      )}
    </FlexGap>
  )
}

export default FooterIcons
