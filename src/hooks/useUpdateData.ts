import fetchNui from "../utils/fetchNui";
import {useSetRecoilState} from "recoil";
import {state} from "../atoms/app-atoms";

interface DataResponse {
  history: number[]
  value: number;
  balance: number
}

export const useUpdateData = () => {
  const setValue = useSetRecoilState(state.currentValue)
  const setHistory = useSetRecoilState(state.history)
  const setBalance = useSetRecoilState(state.balance)

  fetchNui<DataResponse>('npwd_crypto:fetchData').then(({history, value, balance}) => {
    setValue(value)
    setHistory(history)
    setBalance(balance)
  })
}