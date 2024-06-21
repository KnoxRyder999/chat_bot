import { Avatar, Box, Typography } from '@mui/material';
import { FC } from 'react';

import { useAuth } from '../context/AuthContext';
import { Message } from '../types/Message';
import CodeBlock from './CodeBlock';
import openaiLogo from '/openai.svg';

/**
 * Extracts blocks of code from a ChatGPT response.
 * @param response The ChatGPT response potentially containing code.
 * @returns An array of strings containing only the code blocks.
 */

interface ExtractedContent {
  codeBlocks: string[];
  textBlocks: string[];
}

const CODEBLOCKPATTERN = /```[\s\S]*?```/g;

const extractContent = (response: string): ExtractedContent => {
  const codeBlockPattern = CODEBLOCKPATTERN;
  const splitResponse = response.split(codeBlockPattern);

  const matches = response.match(codeBlockPattern);

  const codeBlocks = matches
    ? matches.map((match) => match.replace(/```/g, '').trim())
    : [];
  const textBlocks = splitResponse
    .map((block) => block.trim())
    .filter((block) => block.length > 0);

  return { codeBlocks, textBlocks };
};

const isContainCode = (response: string): boolean => {
  const codeBlockPattern = CODEBLOCKPATTERN;
  return codeBlockPattern.test(response);
};

const extractLanguage = (text: string): string | null => {
  const languagePattern = /^([a-zA-Z]+)$/m;
  const match = text.match(languagePattern);
  if (match) {
    return match[1];
  }
  return null;
};
interface ChatItemProps {
  message: Message;
}

export const ChatItem: FC<ChatItemProps> = ({ message }) => {
  const auth = useAuth();
  const isAssistant = message.role === 'assistant';

  let textBlocks: string[] = [];
  let codeBlocks: string[] = [];
  function displayBlocks() {
    if (isContainCode(message.content)) {
      const content = extractContent(message.content);
      codeBlocks = content.codeBlocks;
      textBlocks = content.textBlocks;
      codeBlocks.map((codeBlock, index) => {
        const language = extractLanguage(codeBlock);
        return (
          <CodeBlock
            key={index}
            language={language ? language : undefined}
            value={codeBlock}
          />
        );
      });
    } else {
      <Typography>{message.content}</Typography>;
    }
  }

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
      {() => displayBlocks}
    </Box>
  );
};
