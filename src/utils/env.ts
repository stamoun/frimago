interface AppEnv {
  googleAuthClientId: string;
  googleAuthScopes: string[];
  googleAuthRedirectUri: string;
  googleAuthCalendarApiKey: string;
}

const env: AppEnv = {
  googleAuthClientId: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID,
  googleAuthScopes: import.meta.env.VITE_GOOGLE_AUTH_SCOPES?.split(','),
  googleAuthRedirectUri: import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_URI,
  googleAuthCalendarApiKey: import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY,
};

export { env };
