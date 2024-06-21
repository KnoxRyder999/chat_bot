import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  language: string | undefined;
  value: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
  return (
    <SyntaxHighlighter language={language ?? undefined} style={coldarkCold}>
      {value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
