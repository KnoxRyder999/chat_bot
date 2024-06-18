import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { useRef, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { ChatItem } from '../components/ChatItem';
import { useAuth } from '../context/AuthContext';
import { sendChatRequest } from '../helpers/api-communicator';
import { Message } from '../types/Message';

// to be erase ...
const testMessages = [
  {
    role: 'user',
    content:
      'Kris: Okay the ProMazda race at Laguna Seca is about to start, wish me luck! Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit.',
  },
  {
    role: 'assistant',
    content:
      'Good luck, Kris! You got this! Remember to stay focused and keep your cool.',
  },
  {
    role: 'user',
    content: 'Lakel: Where is this race?',
  },
  {
    role: 'assistant',
    content: 'This race is taking place at Laguna Seca, Lakel.',
  },
  {
    role: 'user',
    content: 'Kruvinas: hey I just got here, whats going on?',
  },
  {
    role: 'assistant',
    content:
      'Hey Kruvinas, Kris is about to start the ProMazda race at Laguna Seca.',
  },
  {
    role: 'system',
    content:
      'The race ended and now we are racing Lotus 79 cars at Summit Point',
  },
  {
    role: 'user',
    content: 'Lakel: Where are we now?',
  },
  {
    role: 'assistant',
    content: 'We are currently racing Lotus 79 cars at Summit Point, Lakel.',
  },
  {
    role: 'user',
    content: 'QTBear: what has Lakel been asking about?',
  },
  {
    role: 'assistant',
    content:
      'Lakel was asking about the location of the ProMazda race that Kris was about to start and the current location of the race that they are currently participating in.',
  },
  {
    role: 'user',
    content: 'QTBear: who are you?',
  },
  {
    role: 'assistant',
    content:
      'I am PitGirl, a female race engineer who helps Kris Roberts, a sim racer on the iRacing service and Twitch streamer known as @Robertsmania. My job is to assist Kris in any way possible during his races.',
  },
  {
    role: 'user',
    content: 'Lakel: What is iRacing and can you use VR with it?',
  },
];

export const Chat = ({}) => {
  const auth = useAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chats, setChats] = useState<Message[]>([testMessages]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    console.log('🚀 ~ handleSubmit ~ content:', content);

    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
    }

    const newMessage: Message = { role: 'user', content };
    setChats((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);
    setChats([...chatData.chats]);
  };

  // useLayoutEffect(() => {
  //   if (auth?.isLoggedIn && auth.user) {
  //     toast.loading('Loading Chats', { id: 'loadChats' });
  //     getUserChats()
  //       .then((data) => {
  //         setChats([...data.chats]);
  //         toast.success('Successfully loaded chats', { id: 'loadChats' });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         toast.error('Loading Failed', { id: 'loadChats' });
  //       });
  //   }
  // });

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
          {chats.map((chat, index) => {
            return <ChatItem key={index} message={chat} />;
          })}
        </Box>
        <div
          style={{
            width: '100%',
            borderRadius: 8,
            backgroundColor: 'rgb(17,27,39)',
            display: 'flex',
            margin: 'auto',
          }}
        >
          <input
            ref={inputRef}
            type='text'
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              padding: '30px',
              border: 'none',
              outline: 'none',
              color: 'white',
              fontSize: '20px',
            }}
          />
          <IconButton onClick={handleSubmit} sx={{ color: 'white', mx: 1 }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};
