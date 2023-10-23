import { extendTheme } from '@chakra-ui/react';

const breakpoints = {
  base: '200px',
  mob: '375px',
  sm: '480px',
  xsm: '665px',
  md: '768px',
  xmd: '898px',
  lg: '992px',
  xlg: '1224px',
  desk: '1430px',
  xl: '1536px',
};
const colors = {
  brand: {
    500: '#137F63',
    200: '#137F63',
  },
  d_white: '#FFFFFF', //---
  d_black: '#000000',
  d_bg: '#170E22',
  d_text: '#D4D4D4',
  d_text1: '#9F93AD',
  d_text2: '#110E15',
  d_note: '#CBCBCB',
  d_red: '#E82222',
  d_name: '#AEAEAE',
  d_yellow: '#FFDE16',
};


const theme = extendTheme({
  breakpoints,
  // colors,
  // fonts,
});
export default theme;

