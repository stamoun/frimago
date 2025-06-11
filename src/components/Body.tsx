import React from 'react';
import styled from 'styled-components';
import { useAuthStore } from '../store/authStore';
import { OfficePicker } from './OfficePicker';

const BodyDiv = styled.div`
  width: 100%;
  flex: 1 1 auto;
  overflow: auto;
`;

const Body: React.FC = () => {
  const token = useAuthStore((state) => state.token);
  return (
    <BodyDiv>
      {token && <OfficePicker />}
    </BodyDiv>
  );
};

export { Body };

