import { PropsWithChildren, memo } from 'react'
import { Column } from '@sarcoinswap/uikit'
import { Wrapper } from '../styles'

export const FormContainer = memo(function FormContainer({ children }: PropsWithChildren) {
  return (
    <Wrapper>
      <Column gap="md" pl="8px" pr="8px" pb="8px" pt="0px">
        {children}
      </Column>
    </Wrapper>
  )
})
