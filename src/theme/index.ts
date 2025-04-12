import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html :where(h1, h2, h3, h4, h5, h6)': {
        fontSize: 'revert',
        fontWeight: 'revert',
      },
    },
  },
});

export default theme;
