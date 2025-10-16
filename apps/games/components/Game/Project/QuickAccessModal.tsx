import { styled } from 'styled-components'
import { Box } from '@sarcoinswap/uikit'
import { GameType } from '@sarcoinswap/games'
import { QuickAccess } from 'components/Game/Project/QuickAccess'

const StyledQuickAccessModal = styled(Box)`
  position: absolute;
  z-index: ${({ theme }) => theme.zIndices.modal};
`

interface QuickAccessModalProps {
  game: GameType | undefined
}

export const QuickAccessModal: React.FC<React.PropsWithChildren<QuickAccessModalProps>> = ({ game }) => {
  if (!game) {
    return null
  }

  return (
    <StyledQuickAccessModal>
      <QuickAccess isOpen game={game} />
    </StyledQuickAccessModal>
  )
}
