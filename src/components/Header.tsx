import React from 'react';
import styled from 'styled-components';
import AccountAvatar from './AccountAvatar';
import Logo from './Logo';
import { ColorModeButton } from './ui/ColorMode';

const HeaderDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Header: React.FC = () => {
  return (
    <HeaderDiv>
      <Logo />
      <RightSection>
        <AccountAvatar />
        <ColorModeButton aria-label="Toggle color mode" />
      </RightSection>
    </HeaderDiv>
  );
};

export default Header;
