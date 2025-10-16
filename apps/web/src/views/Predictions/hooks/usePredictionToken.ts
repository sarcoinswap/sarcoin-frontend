import { useAtom } from 'jotai'
import { ChainId } from '@sarcoinswap/chains'
import { PredictionSupportedSymbol } from '@sarcoinswap/prediction'
import atomWithStorageWithErrorCatch from 'utils/atomWithStorageWithErrorCatch'

const PREDICTION_TOKEN_KEY = 'prediction-token-v2'

const usePredictionTokenAtom = atomWithStorageWithErrorCatch<Record<ChainId, PredictionSupportedSymbol> | null>(
  PREDICTION_TOKEN_KEY,
  null,
)

export function usePredictionToken() {
  return useAtom(usePredictionTokenAtom)
}
