import {Avatar, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import Balance from "@mui/icons-material/AccountBalanceWallet";
import CashValue from "@mui/icons-material/AttachMoney";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import React from "react";
import {AvatarListItem} from "./AvatarListItem";

export const BalanceList = () => {

  return (
    <List sx={{width: "100%"}}>
      <AvatarListItem
        heading={"Balance"}
        text={"69"}
        icon={<Balance fontSize={"medium"} color={"primary"}/>}
      />
      <AvatarListItem
        heading={"Cash Value"}
        text={"$1800"}
        icon={<CashValue fontSize={"medium"} color={"primary"}/>}
      />
      <AvatarListItem
        heading={"Crypto Worth"}
        text={"$18"}
        icon={<CurrencyBitcoinIcon fontSize={"medium"} color={"primary"}/>}
      />
    </List>
  )
}