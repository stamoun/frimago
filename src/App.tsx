import styled from 'styled-components';
import Body from './components/Body';
import Footer from './components/Footer';
import Header from './components/Header';

const AppDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const App: React.FC = () => {
  return (
    <AppDiv>
      <Header />
      <Body />
      <Footer />
    </AppDiv>
  );
};

export default App;
