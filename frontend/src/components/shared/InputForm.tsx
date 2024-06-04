import { TextField } from '@mui/material';
import { FC } from 'react';

interface InputFormProps {
  type: string;
  label: string;
  name: string;
}

export const InputForm: FC<InputFormProps> = ({ type, label, name }) => {
  return (
    <TextField
      variant='outlined'
      margin='normal'
      required
      fullWidth
      InputLabelProps={{ style: { color: 'white' } }}
      InputProps={{
        style: {
          color: 'white',
        },
      }}
      type={type}
      label={label}
      name={name}
      autoComplete={name}
      autoFocus
    />
  );
};
