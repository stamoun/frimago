'use client';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ColorModeProvider, type ColorModeProviderProps } from './ui/colorMode';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { env } from '../utils/env';

export function Providers(props: ColorModeProviderProps) {
  return (
    <GoogleOAuthProvider clientId={env.googleAuthClientId}>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider {...props} />
      </ChakraProvider>
    </GoogleOAuthProvider>
  );
}
