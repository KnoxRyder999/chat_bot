import { createTheme } from '@mui/material/styles';

/* CSS HEX */
// --brunswick-green: #22443dff;
// --mauveine: #9000b3ff;
// --cool-gray: #8896abff;
// --columbia-blue: #c5d5e4ff;
// --phthalo-blue: #0a0c8bff;

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto Slab, serif',
    allVariants: { color: 'white' },
  },
  palette: {
    primary: {
      // main: '#0a0c8b',
      main: '#05101c',
    },
    secondary: {
      main: '#9000b3ff',
    },
  },
});

export default theme;
