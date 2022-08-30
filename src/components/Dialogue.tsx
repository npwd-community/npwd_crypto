import React, {ChangeEvent, useState} from 'react'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle, FormGroup,
  Input,
  InputAdornment, Typography,
} from "@mui/material";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {state} from '../atoms/app-atoms'
import fetchNui from "../utils/fetchNui";
import {ServerPromiseResp} from "../types/common";
import {useSnackbar} from "./snackbar/useSnackbar";
import {TextField} from 'layout/ui'

interface Dialogue {
  close: () => void;
}

interface TryBuyResp {
  reason: string;
  newBal: number;
}

export const BuyDialogue: React.FC<Dialogue> = ({close}) => {
  const [amount, setAmount] = useState("")
  const [error, setError] = useState(false)

  const currentRate = useRecoilValue(state.currentValue)
  const setBalance = useSetRecoilState(state.balance)

  const {addAlert} = useSnackbar()

  const handleBuy = () => {
    const number = parseFloat(amount)

    fetchNui<ServerPromiseResp<TryBuyResp>>('npwd_crypto:tryBuyCrypto', {
      amount: number
    }).then((resp) => {
      if (resp.status === "error") {
        setError(true)
        return addAlert({
          message: resp.data.reason,
          type: "error"
        })
      }

      setError(false)
      setBalance(resp.data.newBal)
    })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
  }

  return (
    <>
      <DialogTitle> Confirm Purchase </DialogTitle>
      <DialogContent>
        {amount &&
          <Typography>
            You will receive {(parseFloat(amount) / currentRate).toFixed(2)} bits
          </Typography>
        }
        <TextField
          value={amount}
          onChange={handleChange}
          placeholder="Amount"
          type="number"
          error={error}
          InputProps={{
            startAdornment: <InputAdornment position="start" variant="standard">$</InputAdornment>
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="text" color="error" onClick={close}>
          Cancel
        </Button>
        <Button variant="text" color="success" onClick={handleBuy}>
          Confirm
        </Button>
      </DialogActions>
    </>
  )
}

interface TrySellResp {
  reason: string;
  newBal: number;
}

export const SellDialogue: React.FC<Dialogue> = ({close}) => {
  const [amount, setAmount] = useState("")
  const [error, setError] = useState(false)

  const currentRate = useRecoilValue(state.currentValue)
  const setBalance = useSetRecoilState(state.balance)

  const {addAlert} = useSnackbar()

  const handleSell = () => {
    const number = parseFloat(amount)

    fetchNui<ServerPromiseResp<TrySellResp>>('npwd_crypto:trySellCrypto', {
      amount: number
    }).then((resp) => {
      if (resp.status === "error") {
        setError(true)
        return addAlert({
          message: resp.data.reason,
          type: "error"
        })
      }

      setError(false)
      setBalance(resp.data.newBal)
    })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
  }

  return (
    <>
      <DialogTitle> Confirm Sell </DialogTitle>
      <DialogContent>
        {amount &&
            <Typography>
                You will receive ${parseFloat(amount) * currentRate}
            </Typography>
        }
        <TextField
          value={amount}
          onChange={handleChange}
          placeholder="Amount"
          type="number"
          error={error}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="text" color="error" onClick={close}>
          Cancel
        </Button>
        <Button variant="text" color="success" onClick={handleSell}>
          Confirm
        </Button>
      </DialogActions>
    </>
  )
}

interface TryTradeResp {
  reason: string;
  newBal: number;
}

export const TradeDialogue: React.FC<Dialogue> = ({close}) => {
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [error, setError] = useState(false)

  const currentRate = useRecoilValue(state.currentValue)
  const setBalance = useSetRecoilState(state.balance)

  const {addAlert} = useSnackbar()

  const handleTrade = () => {
    const number = parseFloat(amount)
    const id = parseInt(source)

    fetchNui<ServerPromiseResp<TryTradeResp>>('npwd_crypto:tryTradeCrypto', {
      amount: number,
      target: id
    }).then((resp) => {
      if (resp.status === "error") {
        setError(true)
        return addAlert({
          message: resp.data.reason,
          type: "error"
        })
      }

      setError(false)
      setBalance(resp.data.newBal)
    })
  }

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
  }

  const handleSourceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSource(e.target.value)
  }

  return (
    <>
      <DialogTitle> Confirm Trade </DialogTitle>
      <DialogContent>
        {amount &&
            <Typography>
                You will receive ${parseFloat(amount) * currentRate}
            </Typography>
        }
        <FormGroup>
          <TextField
            value={amount}
            onChange={handleAmountChange}
            placeholder="Amount"
            type="number"
            error={error}
          />
          <TextField
            value={source}
            onChange={handleSourceChange}
            placeholder="Player ID"
            type="number"
            error={error}
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button variant="text" color="error" onClick={close}>
          Cancel
        </Button>
        <Button variant="text" color="success" onClick={handleTrade}>
          Confirm
        </Button>
      </DialogActions>
    </>
  )
}