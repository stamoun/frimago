import React from 'react';
import classes from './Logo.module.css';
import { Group, Text } from '@mantine/core';

const Logo: React.FC = () => {
  return (
    <Group className={classes.logo}>
      <Text className={classes.fri}>Fri</Text>
      <Text className={classes.ma}>ma</Text>
      <Text className={classes.go}>go</Text>
    </Group>
  );
};

export { Logo };
