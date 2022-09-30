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
    500: '#d36712',
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

// import { extendTheme } from '@chakra-ui/react'
//
// const theme = extendTheme({
//   colors: {
//     brand: {
//       primary: '#ec6e24',
//       secondary: '#ec9835',
//       base: 'e1e1e1',
//       50: '#fff1df',
//       100: '#fdd6b5',
//       200: '#f7b888',
//       300: '#f2975a',
//       400: '#ed732c',
//       500: '#d36712',
//       600: '#a55a0c',
//       700: '#764707',
//       800: '#483001',
//       900: '#1e1100',
//     },
//   };  fonts: {
//     body: "system-ui, sans-serif",
//     heading: "Georgia, serif",
//     mono: "Menlo, monospace",
//   },
//   fontSizes: {
//     xs: "0.75rem",
//     sm: "0.875rem",
//     md: "1rem",
//     lg: "1.125rem",
//     xl: "1.25rem",
//     "2xl": "1.5rem",
//     "3xl": "1.875rem",
//     "4xl": "2.25rem",
//     "5xl": "3rem",
//     "6xl": "3.75rem",
//     "7xl": "4.5rem",
//     "8xl": "6rem",
//     "9xl": "8rem",
//   },
//   fontWeights: {
//     hairline: 100,
//     thin: 200,
//     light: 300,
//     normal: 400,
//     medium: 500,
//     semibold: 600,
//     bold: 700,
//     extrabold: 800,
//     black: 900,
//   },
//   lineHeights: {
//     normal: "normal",
//     none: 1,
//     shorter: 1.25,
//     short: 1.375,
//     base: 1.5,
//     tall: 1.625,
//     taller: "2",
//     "3": ".75rem",
//     "4": "1rem",
//     "5": "1.25rem",
//     "6": "1.5rem",
//     "7": "1.75rem",
//     "8": "2rem",
//     "9": "2.25rem",
//     "10": "2.5rem",
//   },
//   letterSpacings: {
//     tighter: "-0.05em",
//     tight: "-0.025em",
//     normal: "0",
//     wide: "0.025em",
//     wider: "0.05em",
//     widest: "0.1em",
//   },
//   breakpoints: {
//     sm: '30em',
//     md: '48em',
//     lg: '62em',
//     xl: '80em',
//     '2xl': '96em',
//   }
// });
