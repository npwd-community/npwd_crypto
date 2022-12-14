import React, {useEffect} from 'react';
import {NuiProvider} from 'react-fivem-hooks';
import {Route, Switch} from 'react-router-dom';
import styled from 'styled-components';
import {IPhoneSettings} from '@project-error/npwd-types';
import {i18n} from 'i18next';
import {Theme, StyledEngineProvider, Typography, Paper} from '@mui/material';
import NavBar from './components/NavBar';
import Header from "./components/Header";
import {Portfolio} from "./views/Portfolio";
import {History} from "./views/History"
import {Transactions} from "./views/Transactions";
import ThemeSwitchProvider from "./ThemeSwitchProvider";
import {RecoilRoot, useSetRecoilState} from "recoil";
import {state} from "./atoms/app-atoms";
import fetchNui from "./utils/fetchNui";
import SnackbarProvider from "./components/snackbar/SnackbarProvider";
import {PhoneSnackbar} from "./components/snackbar/PhoneSnackbar";

interface AppProps {
  theme: Theme;
  i18n: i18n;
  settings: IPhoneSettings;
}

const Container = styled(Paper)`
  flex: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-height: 100%;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 1.5rem;
  max-height: calc(100% - 7.5rem);
`;

interface DataResponse {
  history: number[]
  value: number;
  balance: number
}

const App = (props: AppProps) => {
  const setValue = useSetRecoilState(state.currentValue)
  const setHistory = useSetRecoilState(state.history)
  const setBalance = useSetRecoilState(state.balance)

  useEffect( () => {
    fetchNui<DataResponse>('npwd_crypto:fetchData').then(({history, value, balance}) => {
      setValue(value)
      setHistory(history)
      setBalance(balance)
    })
  }, [])

  return (
    <StyledEngineProvider injectFirst>
      <ThemeSwitchProvider mode={props.theme.palette.mode}>
        <PhoneSnackbar />
        <Container>
          <Header>
            <Typography fontSize={24} fontWeight="bold">
              Crypto
            </Typography>
          </Header>
          <Content>
            <Switch>
              <Route path="/crypto" exact component={Portfolio}/>
              <Route path="/crypto/history" component={History}/>
              <Route path="/crypto/transactions" component={Transactions}/>
            </Switch>
          </Content>

          <NavBar/>
        </Container>

      </ThemeSwitchProvider>
    </StyledEngineProvider>
  );
};

const WithProviders: React.FC<AppProps> = (props) => (
  <RecoilRoot>
    <NuiProvider>
      <SnackbarProvider >
        <App {...props} />
      </SnackbarProvider>
    </NuiProvider>
  </RecoilRoot>
);

export default WithProviders;
