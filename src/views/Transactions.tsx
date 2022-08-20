import React from 'react'
import CashValue from '@mui/icons-material/AttachMoney';
import SellIcon from '@mui/icons-material/Sell';
import Transfer from '@mui/icons-material/SubdirectoryArrowRight';
import {Divider, List, Paper} from "@mui/material";
import {AvatarListItem} from "../components/AvatarListItem";
import {Transaction} from "../types";
import {useRecoilValue} from "recoil";
import {state} from '../atoms/app-atoms'

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
  const data = useRecoilValue(state.transactions)

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
          data.map(transaction => (
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
