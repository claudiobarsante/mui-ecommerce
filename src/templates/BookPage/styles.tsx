import { styled, Theme } from '@mui/material/styles';
import { Box } from '@mui/material';

export const BookDetailContainer = styled(Box)(({ theme }) => ({
  display: 'flex'
  // padding: theme.spacing(4)
}));

export const BookDetailInfoContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 500,
  lineHeight: 1.5
}));

export const BookImage = styled('img')(({ src, theme }) => ({
  src: `url(${src})`,
  width: '100%',
  //background: Colors.light_gray,
  padding: '10px'
  // [theme.breakpoints.down("md")]: {
  //   width: "80%",
  //   padding: '24px',
  // },
}));
