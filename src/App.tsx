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
import {useSetRecoilState} from "recoil";
import {state} from "./atoms/app-atoms";
import fetchNui from "./utils/fetchNui";
import {useUpdateData} from "./hooks/useUpdateData";

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

const App = (props: AppProps) => {

  useEffect( () => {
    useUpdateData()
  }, [])

  return (
    <StyledEngineProvider injectFirst>
      <ThemeSwitchProvider mode={props.theme.palette.mode}>
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
  <NuiProvider>
    <App {...props} />
  </NuiProvider>
);

export default WithProviders;
