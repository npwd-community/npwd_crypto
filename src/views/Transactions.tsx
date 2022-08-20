import React from 'react'
import CashValue from '@mui/icons-material/AttachMoney';
import SellIcon from '@mui/icons-material/Sell';
import Transfer from '@mui/icons-material/SubdirectoryArrowRight';
import {Divider, List, Paper} from "@mui/material";
import {AvatarListItem} from "../components/AvatarListItem";

interface Transaction {
  type: "bought" | "sold" | "transferred";
  amount: number
  value: number
}

const mockData: Transaction[] = [
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

function getListItem({type, amount, value}: Transaction) {
  switch (type) {
    case "bought":
      return <AvatarListItem
        heading={"Purchase"}
        text={`Bought ${amount} for $${value}`}
        icon={<SellIcon color={"error"}/>}
      />
    case "sold":
      return <AvatarListItem
        heading={"Sold"}
        text={`Sold ${amount} for $${value}`}
        icon={<CashValue color={"success"}/>}
      />
    case "transferred":
      return <AvatarListItem
        heading={"Transfer"}
        text={`Transferred ${amount} worth ${value}`}
        icon={<Transfer color={"info"}/>}
      />
  }
}

export const Transactions = () => {
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
          mockData.map(transaction => (
            <>
              {getListItem(transaction)}
              <Divider/>
            </>
          ))
        }
      </List>
    </Paper>
  )
}
