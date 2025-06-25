import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { Moon, Sun } from 'lucide-react';
import { useEffect } from 'react';

const ThemeToggle: React.FC = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  useEffect(() => {
    setColorScheme(colorScheme === 'dark' ? 'dark' : 'light');
  }, [colorScheme, setColorScheme]);

  return (
    <ActionIcon
      aria-label="Toggle color scheme"
      variant="default"
      onClick={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}>
      {colorScheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </ActionIcon>
  );
};

export { ThemeToggle };
