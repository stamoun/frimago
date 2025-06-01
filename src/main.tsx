import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import React from 'react';
import ReactDOM, { type Container } from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as Container).render(
  <React.StrictMode>
    <ChakraProvider value={defaultSystem}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
