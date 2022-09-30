module.exports = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 120,
  proseWrap: 'always',
  tabWidth: 2,
  importOrder: [
    '^react',
    '^next|^axios',
    '^@tanstack',
    '^(@chakra-ui|@emotion)',
    'utils|hooks|services',
    'types',
    '^./|^../',
  ],
  importOrderSeparation: true,
};
