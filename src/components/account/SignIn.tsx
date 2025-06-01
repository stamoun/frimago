import React, { useCallback, useMemo } from 'react';
import { useAppUserInfoStore } from '../../store/appUserInfoStore';
import { env } from '../../utils/env';
import { toAppUserInfo } from '../../utils/appUserInfo';
import GoogleOneTapLogin from 'react-google-one-tap-login';
import type { IGoogleCallbackResponse } from 'react-google-one-tap-login/dist/types/types';
import { LoggedInUserInfo } from './LoggedInUserInfo';

const SignIn: React.FC = () => {
  const appUserInfo = useAppUserInfoStore((state) => state.appUserInfo);
  const setAppUserInfo = useAppUserInfoStore((state) => state.setAppUserInfo);
  const client_id = env.googleAuthClientId;

  const decodeToken = useCallback(
    ({ credential }: IGoogleCallbackResponse) => {
      if (credential) {
        const appUserInfo = toAppUserInfo(credential);
        setAppUserInfo(appUserInfo);
      }
    },
    [appUserInfo]
  );

  const googleAccountConfigs = useMemo(
    () => ({
      client_id,
      callback: decodeToken,
    }),
    []
  );

  return appUserInfo ? (
    <LoggedInUserInfo />
  ) : (
    <GoogleOneTapLogin
      // TODO: use proper error handling
      onError={console.error}
      googleAccountConfigs={googleAccountConfigs}
    />
  );
};

export { SignIn as AccountInfo };
