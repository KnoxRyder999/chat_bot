import { AppBar, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Logo } from './Logo';
import { NavigationLink } from './NavigationLink';

interface HeaderProps {}

export const Header: FC<HeaderProps> = ({}) => {
  const theme = useTheme();
  const location = useLocation();

  const auth = useAuth();
  return (
    <AppBar sx={{ bgcolor: theme.palette.primary.main }}>
      <Toolbar>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              {location.pathname !== '/chat' && (
                <NavigationLink
                  bg={theme.palette.primary.light}
                  textColor='white'
                  to={'/chat'}
                  text='Go to Chat'
                />
              )}
              <NavigationLink
                bg={theme.palette.secondary.dark}
                textColor='white'
                to={'/'}
                text='Logout'
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg='white'
                textColor='black'
                to={'/login'}
                text='Login'
              />
              <NavigationLink
                bg='black'
                textColor='white'
                to={'/signup'}
                text='Signup'
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};
