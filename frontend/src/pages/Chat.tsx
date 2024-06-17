import { Avatar, Box, Button, Typography } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { useLayoutEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export const Chat = ({}) => {
  const auth = useAuth();
  const [chats, setChats] = useState<Message[]>([]);

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading('Loading Chats', { id: 'loadChats' });
      // getUserChats();
    }
  });

  return (
    <Box
      // maxWidth='sm'
      sx={{
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100%',
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: 'flex', xs: 'none', sm: 'none' },
          flex: 0.15,
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: '100vh',
            bgcolor: grey[900],
            flexDirection: 'column',
            mx: 3,
            margin: 0,
            gap: 2,
            paddingX: 2,
          }}
        >
          <Avatar
            sx={{
              mx: 'auto',
              my: '12',
              bgcolor: 'white',
              color: 'black',
              fontWeight: 500,
              mt: 2,
            }}
          >
            {auth?.user?.name[0].toUpperCase()}
            {auth?.user?.name.split(' ')[1] !== undefined
              ? auth?.user?.name.split(' ')[1][0].toUpperCase()
              : ''}
          </Avatar>
          <Typography sx={{ mx: 'auto', fontFamily: 'work sans' }}>
            You are talking to a ChatBOT
          </Typography>
          <Typography sx={{ mx: 'auto', fontFamily: 'work sans' }}>
            You can ask some questions related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information
          </Typography>
          <Button
            sx={{
              bgcolor: red[300],
              ':hover': { bgcolor: red.A700 },
              color: 'white',
            }}
          >
            Clear conversation
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: 'column',
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: '40px',
            color: 'white',
            mb: 2,
            mx: 'auto',
            fontWeight: '600',
          }}
        >
          Model - GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: '100%',
            height: '60vh',
            borderRadius: 3,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'scroll',
            overflowX: 'hidden',
            overflowY: 'auto',
            scrollBehavior: 'smooth',
          }}
        >
          chats...
        </Box>
      </Box>
    </Box>
  );
};
