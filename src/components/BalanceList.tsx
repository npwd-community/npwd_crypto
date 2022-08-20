import {Avatar, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import Balance from "@mui/icons-material/AccountBalanceWallet";
import CashValue from "@mui/icons-material/AttachMoney";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import React from "react";
import {AvatarListItem} from "./AvatarListItem";

interface Balances {
  value: number;
  balance: number;
}

export const BalanceList: React.FC<Balances> = ({value, balance}) => {

  return (
    <List sx={{width: "100%"}}>
      <AvatarListItem
        heading={"Balance"}
        text={balance.toString()}
        icon={<Balance fontSize={"medium"} color={"primary"}/>}
      />
      <AvatarListItem
        heading={"Cash Value"}
        text={`$${(balance * value).toFixed(2)}`}
        icon={<CashValue fontSize={"medium"} color={"primary"}/>}
      />
      <AvatarListItem
        heading={"Crypto Worth"}
        text={`$${value}`}
        icon={<CurrencyBitcoinIcon fontSize={"medium"} color={"primary"}/>}
      />
    </List>
  )
}