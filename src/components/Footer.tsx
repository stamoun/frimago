import React from 'react';
import styled from 'styled-components';

const FooterDiv = styled.div`
  width: 100%;
  font-size: small;
`;

const Footer: React.FC = () => {
  return <FooterDiv>&copy; Frima Studio</FooterDiv>;
};

export { Footer };
