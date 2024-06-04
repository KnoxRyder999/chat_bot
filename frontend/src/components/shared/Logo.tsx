import { Typography } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import openai from '../../../public/openai.svg';

interface LogoProps {}

const LogoSize = '32px';

export const Logo: FC<LogoProps> = ({}) => {
  return (
    <div
      style={{
        display: 'flex',
        marginRight: 'auto',
        // alignItems: 'center',
        gap: '15px',
      }}
    >
      <Link to={'/'}>
        <img
          src={openai}
          alt='openai'
          width={LogoSize}
          height={LogoSize}
          className='inverted-image'
        />
      </Link>
      <Typography
        sx={{
          display: { md: 'block', sm: 'none', xs: 'none' },
          mr: 'auto',
          fontWeight: '800',
        }}
        // variant='h6'
        component='div'
      >
        <span style={{ fontSize: '20px' }}>MERN</span>-GPT
      </Typography>
    </div>
  );
};
