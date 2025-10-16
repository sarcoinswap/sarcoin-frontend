import { Text, TextProps } from '@sarcoinswap/uikit'
import { PropsWithChildren } from 'react'

interface TitleProps extends TextProps, PropsWithChildren {}
export const Title = ({ children }: TitleProps) => {
  return (
    <Text color="secondary" small bold>
      {children}
    </Text>
  )
}
