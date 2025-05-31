import React from 'react';
import styled from 'styled-components';
import AccountAvatar from './AccountAvatar';
import Logo from './Logo';

const HeaderDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Header: React.FC = () => {
  return (
    <HeaderDiv>
      <Logo />
      <AccountAvatar />
    </HeaderDiv>
  );
};

export default Header;
