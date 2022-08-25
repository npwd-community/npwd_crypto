import {ClientUtils, RegisterNuiCB, ServerPromiseResp} from "@project-error/pe-utils";
import {Transaction} from "../src/types";
const Utils = new ClientUtils()

interface FetchDataResp {
  history: number[]
  value: number;
  balance: number;
}

interface FetchTransactions {
  transactions: Transaction[]
}

RegisterNuiCB('npwd_crypto:fetchData', async (data, cb) => {
  const resp = await Utils.emitNetPromise<ServerPromiseResp<FetchDataResp>>('npwd_crypto:fetchCryptoData', {})

  if(resp.status === "ok") {
    cb({ ...resp.data })
  }
})

RegisterNuiCB('npwd_crypto:fetchTransactions', async (data, cb) => {
  const resp = await Utils.emitNetPromise<ServerPromiseResp<FetchTransactions>>('npwd_crypto:fetchTransactionData', {})

  if(resp.status === "ok") {
    cb({ ...resp.data })
  }
})
