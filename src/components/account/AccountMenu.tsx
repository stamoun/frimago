import { Button } from '@chakra-ui/react';
import type React from 'react';

interface AccountMenuProps {
  onLogout: () => void;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ onLogout }) => <Button onClick={onLogout}>Déconnexion</Button>;

export { AccountMenu };
