import { Avatar, Box, Typography } from '@mui/material';
import { FC } from 'react';
import { useAuth } from '../context/AuthContext';
import { Message } from '../types/Message';
import openaiLogo from '/openai.svg';

interface ChatItemProps {
  message: Message;
}

export const ChatItem: FC<ChatItemProps> = ({ message }) => {
  const auth = useAuth();
  const isAssistant = message.role === 'assistant';

  return (
    <Box className={`chat-item ${message.role}`}>
      {isAssistant ? (
        <Avatar sx={{ bgcolor: 'white' }}>
          <img src={openaiLogo} alt='openAI' />
        </Avatar>
      ) : (
        <Avatar sx={{ bgcolor: 'black', color: 'white' }}>
          {auth?.user?.name[0].toUpperCase()}
        </Avatar>
      )}
      <Typography>{message.content}</Typography>
    </Box>
  );
};
