import React from 'react';
import classes from './Footer.module.css';

// const FooterDiv = styled.div`
//   width: 100%;
//   font-size: small;
// `;

const Footer: React.FC = () => {
  return <div className={classes.footer}>&copy; Frima Studio</div>;
};

export { Footer };
