import React, {ChangeEvent, useState} from 'react'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle, FormGroup,
  Input,
  InputAdornment, Typography,
} from "@mui/material";

interface Dialogue {
  close: () => void;
}

const currentRate = 69

export const BuyDialogue: React.FC<Dialogue> = ({close}) => {
  const [amount, setAmount] = useState("")

  const handleBuy = () => {
    const number = parseFloat(amount)

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
        <Input
          value={amount}
          onChange={handleChange}
          placeholder="Amount"
          type="number"
          startAdornment={<InputAdornment position="start" variant="standard">$</InputAdornment>}
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

export const SellDialogue: React.FC<Dialogue> = ({close}) => {
  const [amount, setAmount] = useState("")

  const handleSell = () => {
    const number = parseFloat(amount)

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
        <Input
          value={amount}
          onChange={handleChange}
          placeholder="Amount"
          type="number"
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

export const TradeDialogue: React.FC<Dialogue> = ({close}) => {
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");

  const handleTrade = () => {
    const number = parseFloat(amount)
    const id = parseInt(source)


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
          <Input
            value={amount}
            onChange={handleAmountChange}
            placeholder="Amount"
            type="number"
          />
          <Input
            value={source}
            onChange={handleSourceChange}
            placeholder="Player ID"
            type="number"
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