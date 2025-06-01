/// <reference types="vite/client" />

import 'jwt-decode';

declare module 'jwt-decode' {
  export interface JwtPayload {
    name: string;
    picture: string;
  }
}
