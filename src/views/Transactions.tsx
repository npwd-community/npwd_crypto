import React, {useEffect} from 'react'
import CashValue from '@mui/icons-material/AttachMoney';
import SellIcon from '@mui/icons-material/Sell';
import Transfer from '@mui/icons-material/SubdirectoryArrowRight';
import {Divider, List, Paper} from "@mui/material";
import {AvatarListItem} from "../components/AvatarListItem";
import {Transaction} from "../types";
import {useRecoilState} from "recoil";
import {state} from '../atoms/app-atoms'
import fetchNui from "../utils/fetchNui";

const icons = {
  bought: <SellIcon color={"error"}/>,
  sold: <CashValue color={"success"}/>,
  transferred: <Transfer color={"info"}/>
}

const headings = {
  bought: "Purchase",
  sold: "Sold",
  transferred: "Transfer"
}

const getListItemText = (type: string, amount: number, value: number, isReceiving?: boolean) => {
  console.log(type)
  switch (type) {
    case "bought":
      return `Bought ${amount} for $${value}`
    case "sold":
      return `Sold ${amount} for $${value}`
    case "transferred":
      return isReceiving ?
        `Received ${amount} worth ${value}` :
        `Sent ${amount} worth ${value}`
    default:
      return "Something's wrong here I can feel it."
  }
}

export const Transactions = () => {
  const [data, setData] = useRecoilState(state.transactions)

  useEffect(() => {
    fetchNui<Transaction[]>('npwd_crypto:fetchTransactions').then((resp) => {
      setData(resp)
    })
  }, [])

  return (
    <Paper sx={{
      display: "flex",
      height: "100%",
      flexDirection: "column"
    }} square elevation={0}>
      <List dense sx={{
        width: "100%",
        overflowY: "auto",
        overflowX: "hidden"
      }}>
        {
          data.map(({type, amount, value, isReceiving}, index) => (
            <>
              <AvatarListItem
                heading={headings[type]}
                text={getListItemText(type, amount, value, isReceiving)}
                icon={icons[type]}
                key={index}
              />
              <Divider/>
            </>
          ))
        }
      </List>
    </Paper>
  )
}
