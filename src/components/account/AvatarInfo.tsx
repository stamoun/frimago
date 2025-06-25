import type React from 'react';
import { useAppUserInfoStore } from '../../store/appUserInfoStore';
import { useMemo } from 'react';
import { Avatar, Group, Text } from '@mantine/core';
import { ChevronDown } from 'lucide-react';

const AvatarInfo: React.FC = () => {
  const appUserInfo = useAppUserInfoStore((state) => state.appUserInfo);

  const avatarImage = useMemo(() => appUserInfo?.picture, [appUserInfo?.picture]);

  return (
    <Group gap={7}>
      <Avatar src={avatarImage} alt={appUserInfo?.name} radius="xl" size={20} />
      <Text fw={500} size="sm" lh={1} mr={3}>
        {appUserInfo?.name}
      </Text>
      <ChevronDown size={12} />
    </Group>
  );
};

export { AvatarInfo };
