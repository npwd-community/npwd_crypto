import { atom } from "recoil";
import {Transaction} from "../types";

export const state = {
  currentValue: atom<number>({
    key: 'currentValue',
    default: 1
  }),
  balance: atom<number>({
    key: 'balance',
    default: 0
  }),
  history: atom<number[]>({
    key: 'history',
    default: [38, 42, 56, 56, 69, 32, 48, 50, 57, 57]
  }),
  transactions: atom<Transaction[]>({
    key: 'transactions',
    default: [
      {
        type: "bought",
        amount: 69,
        value: 1000
      },
      {
        type: "sold",
        amount: 420,
        value: 42000
      },
      {
        type: "transferred",
        amount: 2,
        value: 180
      }
    ]
  })
}