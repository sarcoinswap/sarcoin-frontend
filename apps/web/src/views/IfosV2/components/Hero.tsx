import { isIfoSupported } from '@pancakeswap/ifos'
import { useTranslation } from '@pancakeswap/localization'
import { ChainId } from '@pancakeswap/sdk'
import { Box, Button, Container, Flex, Heading, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { styled } from 'styled-components'

import { ASSET_CDN } from 'config/constants/endpoints'
import { getChainName } from '@pancakeswap/chains'
import { getChainBasedImageUrl } from '../helpers'

const StyledHero = styled(Box)`
  position: relative;
  overflow: hidden;
  background: ${({ theme }) =>
    theme.isDark
      ? 'linear-gradient(139.73deg, #313D5C 0%, #3D2A54 100%)'
      : 'linear-gradient(139.73deg, #E6FDFF 0%, #F3EFFF 100%)'};
`

const BunnyContainer = styled(Box)`
  z-index: 1;
  position: absolute;
  right: 0%;
  bottom: -1%;

  ${({ theme }) => theme.mediaQueries.md} {
    right: 10%;
    bottom: 0;
  }
`

const StyledHeading = styled(Heading)`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.secondary};

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 4rem;
  }
`

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.textSubtle};
  color: ${({ theme }) => theme.colors.invertedContrast};
  padding: 8px 13px;
  height: auto;
  text-transform: uppercase;
  align-self: flex-start;
  font-size: 12px;
  box-shadow: ${({ theme }) => theme.shadows.inset};
  border-radius: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
  }
`

const DesktopButton = styled(Button)`
  align-self: flex-end;

  &:hover {
    opacity: 1 !important;
  }
`

const StyledSubTitle = styled(Text)`
  font-size: 16px;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 20px;
  }
`

const Hero = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()

  const handleClick = () => {
    const howToElem = document.getElementById('ifo-how-to')
    if (howToElem != null) {
      howToElem.scrollIntoView()
    } else {
      router.push('/ifo#ifo-how-to')
    }
  }

  return (
    <Box mb="8px">
      <StyledHero py={['14px', '14px', '40px']} minHeight={['212px', '212px', '197px']}>
        <HeaderBunny />
        <Container position="relative" zIndex="2">
          <Flex
            justifyContent="space-between"
            flexDirection={['column', 'column', 'column', 'row']}
            style={{ gap: '4px' }}
          >
            <Box>
              <StyledHeading as="h1" mb={['12px', '12px', '24px']}>
                CAKE.PAD
              </StyledHeading>
              <StyledSubTitle
                bold
                style={{
                  maxWidth: isMobile ? '60%' : '100%',
                }}
              >
                {isMobile
                  ? t('Early access to tokens with CAKE')
                  : t('Get exclusive early access to new tokens with CAKE')}
              </StyledSubTitle>
            </Box>
            {isMobile ? (
              <StyledButton onClick={handleClick} mt="0.375rem">
                {t('How does it work?')}
              </StyledButton>
            ) : (
              <DesktopButton onClick={handleClick} variant="subtle">
                {t('How does it work?')}
              </DesktopButton>
            )}
          </Flex>
        </Container>
      </StyledHero>
    </Box>
  )
}

function getHeadBunny(isMobile: boolean) {
  if (isMobile) {
    return `${ASSET_CDN}/web/ifos/v2/bunny-mobile.png`
  }
  return `${ASSET_CDN}/web/ifos/v2/bunny.png`
}

function HeaderBunny() {
  const { chainId: currentChainId } = useActiveChainId()
  const { isDesktop, isMobile } = useMatchBreakpoints()
  const bunnyImageUrl = useMemo(() => {
    return getHeadBunny(isMobile)
  }, [currentChainId])

  return (
    <BunnyContainer>
      <img
        alt="header-bunny"
        src={bunnyImageUrl}
        style={{
          width: isDesktop ? 393 : 207,
          height: isDesktop ? 197 : 192,
        }}
      />
    </BunnyContainer>
  )
}

export default Hero
