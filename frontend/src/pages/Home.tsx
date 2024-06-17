import { Container, Typography } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface HomeProps {}

export const Home: FC<HomeProps> = ({}) => {
  return (
    <Container
      maxWidth='sm'
      style={{
        marginTop: '64px',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
      }}
    >
      <Typography variant='h1'>MERN-GPT</Typography>
      <Typography paragraph>
        <Link style={{ color: 'white' }} to={'/login'}>
          Login
        </Link>
        &nbsp;&nbsp;or &nbsp;
        <Link style={{ color: 'white' }} to={'/signup'}>
          SingUp
        </Link>
        &nbsp;&nbsp;to start a new experience
      </Typography>
    </Container>
  );
};
