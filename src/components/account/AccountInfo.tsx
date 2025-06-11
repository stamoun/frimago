import { Button, Popover, Portal } from '@chakra-ui/react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import React, { useCallback, useEffect, useState } from 'react'; // Import useRef
import { getUserInfo, getUserScopes } from '../../api/googleApi';
import { GOOGLE_REQUIRED_SCOPES } from '../../constants';
import { useAppUserInfoStore } from '../../store/appUserInfoStore';
import { useAuthStore } from '../../store/authStore';
import { getMissingEntries } from '../../utils/array';
import { AccountMenu } from './AccountMenu';
import { AvatarInfo } from './AvatarInfo';

const AccountInfo: React.FC = () => {
  const setAppUserInfo = useAppUserInfoStore((state) => state.setAppUserInfo);
  const token = useAuthStore((state) => state.token);
  const setToken = useAuthStore((state) => state.setToken);
  const [isLogoutVisible, setIsLogoutVisible] = useState<boolean>(false);

  const handleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      try {
        setToken({
          accessToken: tokenResponse.access_token,
          expiresIn: tokenResponse.expires_in,
          scope: tokenResponse.scope,
        });
      } catch (error) {
        setToken(null);
        console.error(error);
      }
    },
    onError: (error) => {
      resetData(`${error}`);
    },
    flow: 'implicit',
    scope: GOOGLE_REQUIRED_SCOPES.join(' '),
  });

  const setUserProfile = useCallback(
    async (accessToken: string | null) => {
      if (accessToken) {
        try {
          const userInfo = await getUserInfo();
          setAppUserInfo(userInfo);
        } catch (error) {
          setAppUserInfo(null);
          console.error(`${error}`);
        }
      } else {
        setAppUserInfo(null);
      }
    },
    [setAppUserInfo],
  );

  const resetData = useCallback(
    (message?: string) => {
      setToken(null);
      setUserProfile(null);
      if (message) console.log(message);
    },
    [setToken, setUserProfile],
  );

  useEffect(() => {
    const fetchData = async () => {
      if (token?.accessToken) {
        try {
          const scopes = await getUserScopes();

          const missingScopes = getMissingEntries(GOOGLE_REQUIRED_SCOPES, scopes);
          if (missingScopes.length > 0) {
            resetData(`Has missing scopes: ${missingScopes.join(' ')}`);
            return;
          }

          setUserProfile(token.accessToken);
        } catch (error) {
          resetData(`${error}`);
        } finally {
          setIsLogoutVisible(false);
        }
      } else {
        resetData();
        setIsLogoutVisible(false);
      }
    };

    fetchData();
  }, [resetData, setIsLogoutVisible, setToken, setUserProfile, token]);

  const handleLogout = useCallback(() => {
    googleLogout();
    resetData();
  }, [resetData]);

  return token ? (
    <Popover.Root
      open={isLogoutVisible}
      onOpenChange={(e) => setIsLogoutVisible(e.open)}
      positioning={{ placement: 'bottom-end' }}>
      <Popover.Trigger asChild>
        <Button borderRadius={25} variant={'subtle'} padding={'0.5em'}>
          <AvatarInfo />
        </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content maxW={180}>
            <Popover.Body>
              <AccountMenu onLogout={handleLogout} />
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  ) : (
    <Button onClick={() => handleLogin()}>Connexion</Button>
  );
};

export { AccountInfo };
