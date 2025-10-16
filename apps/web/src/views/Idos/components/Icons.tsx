import { TokenLogo } from '@sarcoinswap/uikit'
import styled from 'styled-components'

export const StyledLogo = styled(TokenLogo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
`
