import React, {useState} from 'react';
import {BottomNavigation, BottomNavigationAction} from '@mui/material';
import {NavLink, useLocation} from 'react-router-dom';
import {Theme} from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TimelineIcon from '@mui/icons-material/Timeline';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    color: theme.palette.primary.main,
  },
}));

const NavBar: React.FC = () => {
  const classes = useStyles();
  const {pathname} = useLocation();
  const [page, setPage] = useState(pathname);

  const handleChange = (_e: any, newPage: any) => {
    setPage(newPage);
  };

  return (
    <BottomNavigation value={page} onChange={handleChange} showLabels className={classes.root}>
      <BottomNavigationAction
        label={"Portfolio"}
        value="/crypto"
        component={NavLink}
        icon={<AccountBalanceWalletIcon/>}
        to="/crypto"
      />
      <BottomNavigationAction
        label={"Market History"}
        value="/crypto/history"
        color="secondary"
        component={NavLink}
        icon={<TimelineIcon/>}
        to="/crypto/history"
      />
      <BottomNavigationAction
        label={"Transactions"}
        value="/crypto/transactions"
        color="secondary"
        component={NavLink}
        icon={<CurrencyExchangeIcon/>}
        to="/crypto/transactions"
      />
    </BottomNavigation>
  );
};

export default NavBar;
