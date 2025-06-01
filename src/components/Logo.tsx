import React from 'react';
import styled from 'styled-components';
import '../index.css';

const LogoDiv = styled.div`
  font-size: xx-large;
`;
const Fri = styled.span`
  color: var(--color-fun);
`;

const Ma = styled.span`
  color: var(--color-audace);
`;

const Go = styled.span`
  color: var(--color-entrepreneurship);
`;

const Logo: React.FC = () => {
  return (
    <LogoDiv>
      <Fri>Fri</Fri>
      <Ma>ma</Ma>
      <Go>go</Go>
    </LogoDiv>
  );
};

export { Logo };
