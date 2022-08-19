import React from 'react';
import {NuiProvider} from 'react-fivem-hooks';
import {Route, Switch} from 'react-router-dom';
import styled from 'styled-components';
import {IPhoneSettings} from '@project-error/npwd-types';
import {i18n} from 'i18next';
import {Theme, StyledEngineProvider, ThemeProvider, Typography} from '@mui/material';
import {LoadingSpinner} from "./components/LoadingSpinner";
import NavBar from './components/NavBar';
import Header from "./components/Header";
import {Portfolio} from "./views/Portfolio";
import {History} from "./views/History"
import {Transactions} from "./views/Transactions";

const AppContainer = styled.div<{ isDarkMode: any }>`
  flex: 1;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-between;
  max-height: 100%;
  background-color: #fafafa;
  ${({isDarkMode}) =>
  isDarkMode &&
  `
    background-color: #212121;
  `}
`;

interface AppProps {
  theme: Theme;
  i18n: i18n;
  settings: IPhoneSettings;
}

const Container = styled.div`
  height: 80%;
  padding: 1rem;
`

const App = (props: AppProps) => {
  const isDarkMode = props.theme.palette.mode === 'dark';

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={props.theme}>
        <AppContainer isDarkMode={isDarkMode}>
          <Header>
            <Typography fontSize={24} fontWeight="bold">
              Crypto
            </Typography>
          </Header>

          <Container>
            <React.Suspense fallback={<LoadingSpinner/>}>
              <Switch>
                <Route path="/crypto" exact component={Portfolio}/>
                <Route path="/crypto/history" component={History} />
                <Route path="/crypto/transactions" component={Transactions}/>
              </Switch>
            </React.Suspense>
          </Container>

          <NavBar/>
        </AppContainer>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

const WithProviders: React.FC<AppProps> = (props) => (
  <NuiProvider>
    <App {...props} />
  </NuiProvider>
);

export default WithProviders;
