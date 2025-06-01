import React from 'react';
import styled from 'styled-components';
import { OfficePicker } from './OfficePicker';

const BodyDiv = styled.div`
  width: 100%;
  flex: 1 1 auto;
  overflow: auto;
`;

const Body: React.FC = () => {
  return (
    <BodyDiv>
      <OfficePicker />
    </BodyDiv>
  );
};

export { Body };
