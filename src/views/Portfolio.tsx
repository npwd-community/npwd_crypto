import React from 'react'
import {
  Button,
  Paper,
  styled as MuiStyled, useTheme
} from "@mui/material";
import styled from "styled-components";
import CashValue from '@mui/icons-material/AttachMoney';
import SellIcon from '@mui/icons-material/Sell';
import Transfer from '@mui/icons-material/SubdirectoryArrowRight';
import {BalanceList} from '../components/BalanceList'

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr;
  height: 90%;
  gap: 1.5rem;
  place-items: center;
`

export const Portfolio = () => {
  return (
    <Container>
      <Paper elevation={4} variant={"outlined"} sx={{
        height: "100%",
        width: 300,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <BalanceList />
      </Paper>
      <ControlButtons />
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

const ControlButtons = () => {
  return (
    <ButtonContainer>
      <ActionButton variant="contained" endIcon={<SellIcon />}>
        Buy
      </ActionButton>
      <ActionButton variant="contained" endIcon={<CashValue />}>
        Sell
      </ActionButton>
      <ActionButton variant="contained" endIcon={<Transfer />}>
        Transfer
      </ActionButton>
    </ButtonContainer>
  )
}
