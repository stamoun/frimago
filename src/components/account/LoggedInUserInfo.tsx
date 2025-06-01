import type React from 'react';
import { useAppUserInfoStore } from '../../store/appUserInfoStore';
import styled from 'styled-components';
import { useMemo } from 'react';

const LoggedInUserInfoDiv = styled.div`
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

const LoggedInUserInfo: React.FC = () => {
  const appUserInfo = useAppUserInfoStore((state) => state.appUserInfo);

  const avatarImage = useMemo(() => appUserInfo?.avatarUrl, [appUserInfo?.avatarUrl]);

  return (
    <LoggedInUserInfoDiv>
      <AvatarImage src={avatarImage} alt="User avatar" />
      {appUserInfo?.name}
    </LoggedInUserInfoDiv>
  );
};

export { LoggedInUserInfo };
