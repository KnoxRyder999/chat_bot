import { AppBar, Toolbar } from '@mui/material';
import { FC } from 'react';
import { Logo } from './shared/Logo';

interface HeaderProps {}

export const Header: FC<HeaderProps> = ({}) => {
  return (
    <AppBar sx={{ bgcolor: 'darkblue' }}>
      <Toolbar>
        <Logo />
      </Toolbar>
    </AppBar>
  );
};
