import React from "react";
import {Avatar, ListItem, ListItemAvatar, ListItemText} from "@mui/material";

interface IListItem {
  heading: string;
  text: string;
  icon: React.ReactNode
}

export const AvatarListItem: React.FC<IListItem> = ({heading, text, icon}) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          {icon}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={heading} secondary={text} />
    </ListItem>
  )
}