import React from 'react';
import classes from './Header.module.css';
import { Logo } from './Logo';
import { AccountInfo } from './account/AccountInfo';
import { ThemeToggle } from './theme/ThemeToggle';
import { Container, Group } from '@mantine/core';

const Header: React.FC = () => {
  return (
    <div className={classes.header}>
      <Container>
        <Group justify="space-between">
          <Logo />
          <Group gap="xs">
            <AccountInfo />
            <ThemeToggle />
          </Group>
        </Group>
      </Container>
    </div>
  );
};

export { Header };
