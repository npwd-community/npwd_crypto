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
    default: []
  })
}