import type React from 'react';
import { useAppUserInfoStore } from '../../store/appUserInfoStore';
import styled from 'styled-components';
import { useMemo } from 'react';

const LoginInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5em;
`;

const AvatarImage = styled.img`
  border-radius: 50%;
  object-fit: cover;
  height: 32px;
  width: 32px;
`;

const AvatarInfo: React.FC = () => {
  const appUserInfo = useAppUserInfoStore((state) => state.appUserInfo);

  const avatarImage = useMemo(() => appUserInfo?.picture, [appUserInfo?.picture]);

  return (
    <LoginInfo>
      <AvatarImage src={avatarImage} alt="User avatar" />
      {appUserInfo?.name}
    </LoginInfo>
  );
};

export { AvatarInfo };
