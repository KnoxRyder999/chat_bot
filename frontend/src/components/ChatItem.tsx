import { Avatar, Box, Typography } from '@mui/material';
import { FC } from 'react';

import { useAuth } from '../context/AuthContext';
import { Message } from '../types/Message';
import CodeBlock from './CodeBlock';
import openaiLogo from '/openai.svg';

/**
 * Extracts blocks of code or text from a ChatGPT response.
 * @param response The ChatGPT response potentially containing code.
 * @returns An array of strings containing only the code blocks.
 */

interface ExtractedContent {
  blocks: Array<{ type: 'code' | 'text'; content: string; language?: string }>;
}

const CODE_BLOCK_PATTERN = /```[\s\S]*?```/g;

const extractContent = (response: string): ExtractedContent => {
  const codeBlockPattern = CODE_BLOCK_PATTERN;
  const splitResponse = response?.split(codeBlockPattern);
  const matches = response?.match(codeBlockPattern);

  const blocks: Array<{
    type: 'code' | 'text';
    content: string;
    language?: string;
  }> = [];
  splitResponse?.forEach((textBlock, index) => {
    if (textBlock.trim()) {
      blocks.push({ type: 'text', content: textBlock.trim() });
    }
    if (matches && matches[index]) {
      const codeContent = matches[index].replace(/```/g, '').trim();
      const language = extractLanguage(codeContent) || 'text';
      blocks.push({ type: 'code', content: codeContent, language });
    }
  });

  return { blocks };
};

// const isContainCode = (response: string): boolean => {
//   const codeBlockPattern = CODE_BLOCK_PATTERN;
//   return codeBlockPattern.test(response);
// };

const extractLanguage = (text: string): string | null => {
  const languagePattern = /^([a-zA-Z]+)$/m;
  const match = text.includes('DOCTYPE')
    ? ['html', 'html']
    : text.match(languagePattern);
  return match ? match[1] : null;
};
interface ChatItemProps {
  message: Message;
}

export const ChatItem: FC<ChatItemProps> = ({ message }) => {
  const auth = useAuth();
  const isAssistant = message.role === 'assistant';
  const { blocks } = extractContent(message.content);

  return (
    <Box className={`chat-item ${message.role}`}>
      {isAssistant ? (
        <>
          <Avatar sx={{ bgcolor: 'white' }}>
            <img src={openaiLogo} alt='openAI' />
          </Avatar>
          {blocks.map((block, index) =>
            block.type === 'code' ? (
              <CodeBlock
                key={index}
                language={block.language}
                value={block.content}
              />
            ) : (
              <p key={index}>{block.content}</p>
            )
          )}
        </>
      ) : (
        <>
          <Avatar sx={{ bgcolor: 'black', color: 'white' }}>
            {auth?.user?.name[0].toUpperCase()}
          </Avatar>
          <Typography>{message.content}</Typography>
        </>
      )}
    </Box>
  );
};
