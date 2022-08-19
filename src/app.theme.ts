import { common, orange } from '@mui/material/colors';
import {createTheme} from '@mui/material';

export const APP_PRIMARY_COLOR = orange[500];
export const APP_TEXT_COLOR = common.white;

export const theme = {
  palette: {
    primary: {
      main: APP_PRIMARY_COLOR,
      dark: orange[700],
      light: orange[300],
      contrastText: APP_TEXT_COLOR,
    },
    secondary: {
      main: '#d32f2f',
      light: '#eb4242',
      dark: '#941212',
      contrastText: APP_TEXT_COLOR,
    },
    success: {
      main: '#2196f3',
      contrastText: APP_TEXT_COLOR,
    },
  },
}

export default createTheme(theme)
