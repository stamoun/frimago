import { Theme } from '@chakra-ui/react';
import styled from 'styled-components';
import { Body } from './components/Body';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Providers } from './components/providers';
import './utils/axiosWrapper';

const AppDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const App: React.FC = () => (
  <Providers>
    <Theme>
      <AppDiv>
        <Header />
        <Body />
        <Footer />
      </AppDiv>
    </Theme>
  </Providers>
);

export { App };
