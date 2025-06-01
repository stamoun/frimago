interface AppEnv {
  googleAuthClientId: string;
}

const env: AppEnv = {
  googleAuthClientId: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID,
};

export { env };
