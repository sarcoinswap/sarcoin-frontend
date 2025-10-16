import { GameLinkType } from '@sarcoinswap/games'
import { useMatchBreakpoints } from '@sarcoinswap/uikit'
import { useMemo } from 'react'
import { getGameLink } from 'utils/getGameLink'

export function useGameLink(gameId: string, gameLink: GameLinkType) {
  const { isMobile } = useMatchBreakpoints()

  return useMemo(() => getGameLink({ gameId, isMobile, gameLink }), [isMobile, gameId, gameLink])
}
