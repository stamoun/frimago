import { Container, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import classes from './App.module.css';
import { Body } from './components/Body';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { theme } from './theme';
import './utils/axiosWrapper';
import { env } from './utils/env';

const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={env.googleAuthClientId}>
      <MantineProvider theme={theme}>
        <Container className={classes.app}>
          <Header />
          <Body />
          <Footer />
        </Container>
      </MantineProvider>
    </GoogleOAuthProvider>
  );
};

export { App };
