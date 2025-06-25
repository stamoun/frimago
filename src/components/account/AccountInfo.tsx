import cx from 'clsx';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import React, { useCallback, useEffect, useState } from 'react'; // Import useRef
import { getUserInfo, getUserScopes } from '../../api/googleApi';
import { GOOGLE_REQUIRED_SCOPES } from '../../constants';
import { useAppUserInfoStore } from '../../store/appUserInfoStore';
import { useAuthStore } from '../../store/authStore';
import { getMissingEntries } from '../../utils/array';
import { AvatarInfo } from './AvatarInfo';
import { Group, Menu, Text, UnstyledButton } from '@mantine/core';
import classes from './AccountInfo.module.css';
import { LogIn, LogOut } from 'lucide-react';

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
    <Menu
      opened={isLogoutVisible}
      onClose={() => setIsLogoutVisible(false)}
      onOpen={() => setIsLogoutVisible(true)}
      withArrow
      withinPortal>
      <Menu.Target>
        <UnstyledButton className={cx(classes.button, { [classes.userActive]: isLogoutVisible })}>
          <AvatarInfo />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => handleLogout()} leftSection={<LogOut size={16} />}>
          <Text>Déconnexion</Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  ) : (
    <UnstyledButton className={classes.button} onClick={() => handleLogin()}>
      <Group gap="xs">
        <LogIn size={16} />
        <Text>Connexion</Text>
      </Group>
    </UnstyledButton>
  );
};

export { AccountInfo };
