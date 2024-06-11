import { Box, Button, Typography } from '@mui/material';
import { FC, FormEvent, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { CiLogin } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { InputForm } from '../components/shared/InputForm';
import { useAuth } from '../context/AuthContext';
import robot from '/robot.svg';

interface LoginProps {}

export const Login: FC<LoginProps> = () => {
  // const [email, setEmail] = useState<string>('');
  // const [password, setPassword] = useState<string>('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    try {
      toast.loading('Logging in!', { id: 'login' });
      await auth?.login(email, password);
      toast.success('You are logged successfully!', { id: 'login' });
    } catch (error) {
      console.error('🙀 ~ handleSubmit ~ error:', error);
      toast.error('Login failed', { id: 'login' });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      return navigate('/chat');
    }
  }, [auth]);

  return (
    <Box
      height={'100%'}
      width={'100%'}
      display='flex'
      flex={1}
      justifyContent='center'
    >
      <Box padding={8} mt={8} display={{ md: 'flex', sm: 'none', xs: 'none' }}>
        <img
          className='inverted-image'
          src={robot}
          alt='login'
          style={{ width: '400px' }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          // gap: 8,
          mt: 8,
          paddingX: 4,
        }}
      >
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <InputForm type='email' name='email' label='Email' />
          <InputForm type='password' name='password' label='Password' />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            endIcon={<CiLogin />}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
