import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const colors = {
  brand: {
    primary: '#ec6e24',
    secondary: '#ec9835',
    background: 'rgba(254,111,0,0.1)',
    black: '1e1100',
    white: 'e1e1e1',
    50: '#fff1df',
    100: '#fdd6b5',
    200: '#f7b888',
    300: '#f2975a',
    400: '#ed732c',
    500: '#ec6e24e3',
    600: '#a55a0c',
    700: '#764707',
    800: '#483001',
    900: '#1e1100',
  },
};

const breakpoints = {
  // sm: '320px',
  md: '700px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
};

const theme = extendTheme({ colors, config, breakpoints });

export default theme;

