import {useNuiEvent} from "../utils/useNuiEvent";

export const useAppService = () => {

  useNuiEvent('crypto:event', () => {
    console.log('RECIEVED CRYPTO EVENT !!')
  })
}