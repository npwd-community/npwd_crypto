import React, {useState} from 'react';
import {BottomNavigation, BottomNavigationAction} from '@mui/material';
import {NavLink, useLocation} from 'react-router-dom';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TimelineIcon from '@mui/icons-material/Timeline';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

const NavBar: React.FC = () => {
  const {pathname} = useLocation();
  const [page, setPage] = useState(pathname);

  const handleChange = (_e: any, newPage: any) => {
    setPage(newPage);
  };

  return (
    <BottomNavigation value={page} onChange={handleChange} showLabels sx={{
      width: '100%'
    }}>
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
