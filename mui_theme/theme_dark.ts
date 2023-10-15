'use client';
import { createTheme } from '@mui/material/styles';
import { ruRU } from '@mui/material/locale';

// Dark theme
const theme = createTheme(
  {
    palette: {
      mode: 'dark',
    },

    components: {
      MuiContainer: {
        styleOverrides: {
          root: {
            backgroundColor: 'black',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: 'white',
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: 'black',
          },
        },
      },
    },
  },
  ruRU
);

export default theme;
