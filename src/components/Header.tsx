import { HStack } from '@chakra-ui/react';
import React from 'react';
import styled from 'styled-components';
import { Logo } from './Logo';
import { AccountInfo } from './account/AccountInfo';
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
  gap: 0.5rem;
`;

const Header: React.FC = () => {
  return (
    <HeaderDiv>
      <Logo />
      <RightSection>
        <HStack>
          <AccountInfo />
          <ColorModeButton aria-label="Toggle color mode" />
        </HStack>
      </RightSection>
    </HeaderDiv>
  );
};

export { Header };
