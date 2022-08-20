import React, {useState} from 'react'
import {
  Button,
  Paper,
  styled as MuiStyled,
  Dialog,
} from "@mui/material";
import styled from "styled-components";
import CashValue from '@mui/icons-material/AttachMoney';
import SellIcon from '@mui/icons-material/Sell';
import Transfer from '@mui/icons-material/SubdirectoryArrowRight';
import {BalanceList} from '../components/BalanceList'
import {BuyDialogue, SellDialogue, TradeDialogue} from "../components/Dialogue";
import {useRecoilValue} from "recoil";
import {state} from '../atoms/app-atoms'

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr;
  height: 90%;
  gap: 1.5rem;
  place-items: center;
`

export const Portfolio = () => {
  const balance = useRecoilValue(state.balance)
  const value = useRecoilValue(state.currentValue)

  const [buyOpen, setBuyOpen] = useState(false)
  const [sellOpen, setSellOpen] = useState(false)
  const [tradeOpen, setTradeOpen] = useState(false)

  return (
    <Container>
      <Paper elevation={4} variant={"outlined"} sx={{
        height: "100%",
        width: 300,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <BalanceList
          value={value}
          balance={balance}
        />
      </Paper>
      <ControlButtons
        setBuyOpen={setBuyOpen}
        setSellOpen={setSellOpen}
        setTradeOpen={setTradeOpen}
      />
      <Dialog
        open={buyOpen}
        onClose={() => setBuyOpen(false)}
        hideBackdrop
        disablePortal
      >
        <BuyDialogue close={() => setBuyOpen(false)} />
      </Dialog>
      <Dialog
        open={sellOpen}
        onClose={() => setSellOpen(false)}
        hideBackdrop
        disablePortal
      >
        <SellDialogue close={() => setSellOpen(false)} />
      </Dialog>

      <Dialog
        open={tradeOpen}
        onClose={() => setTradeOpen(false)}
        hideBackdrop
        disablePortal
      >
        <TradeDialogue close={() => setTradeOpen(false)} />
      </Dialog>
    </Container>
  )
}

const ActionButton = MuiStyled(Button)({
  width: 300,
  height: 60,
})

const ButtonContainer = styled.div`
  display: grid;
  place-items: center;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 1rem;
`;

interface Buttons {
  setBuyOpen: React.Dispatch<React.SetStateAction<boolean>>
  setSellOpen: React.Dispatch<React.SetStateAction<boolean>>
  setTradeOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ControlButtons: React.FC<Buttons> = ({setBuyOpen, setSellOpen, setTradeOpen}) => {
  return (
    <ButtonContainer>
      <ActionButton variant="contained" endIcon={<SellIcon/>} onClick={() => setBuyOpen(true)}>
        Buy
      </ActionButton>
      <ActionButton variant="contained" endIcon={<CashValue/>} onClick={() => setSellOpen(true)}>
        Sell
      </ActionButton>
      <ActionButton variant="contained" endIcon={<Transfer/>} onClick={() => setTradeOpen(true)}>
        Transfer
      </ActionButton>
    </ButtonContainer>
  )
}
