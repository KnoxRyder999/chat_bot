import { Box, Button, Typography } from '@mui/material';
import { FormEvent, useEffect } from 'react';
import toast from 'react-hot-toast';
import { SiGnuprivacyguard } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import { InputForm } from '../components/shared/InputForm';
import { useAuth } from '../context/AuthContext';
import robot from '/robot.svg';

export const Signup = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    try {
      toast.loading('Signing ip!', { id: 'signup' });
      await auth?.signup(name, email, password);
      toast.success('Signed up successfully!', { id: 'signup' });
    } catch (error) {
      console.error('🙀 ~ handleSubmit ~ error:', error);
      toast.error('Signing up failed', { id: 'signup' });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      return navigate('/chat');
    }
  }, [auth]);

  return (
    <Box
      height='100%'
      width='100%'
      display='flex'
      flex={1}
      justifyContent='center'
    >
      <Box padding={8} mt={8} display={{ md: 'flex', sm: 'none', xs: 'none' }}>
        <img
          className='inverted-image'
          src={robot}
          alt='signup'
          style={{ width: '400px' }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 8,
          paddingX: 4,
        }}
      >
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <InputForm type='test' name='name' label='Name' />
          <InputForm type='email' name='email' label='Email' />
          <InputForm type='password' name='password' label='Password' />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            endIcon={<SiGnuprivacyguard />}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
