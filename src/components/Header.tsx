import React from 'react';
import {APP_PRIMARY_COLOR, APP_TEXT_COLOR} from '../app.theme';
import {Typography, Box} from '@mui/material';

const Header: React.FC = ({children}) => {
  return (
    <Box
      px={2}
      pt={2}
      sx={{width: '100%', textAlign: 'left', backgroundColor: APP_PRIMARY_COLOR}}
    >
      <Typography sx={{color: APP_TEXT_COLOR}} paragraph variant={'h5'}>
        {children}
      </Typography>
    </Box>
  );
};

export default Header;