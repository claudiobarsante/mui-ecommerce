import { Box, Button, Typography } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import { Colors } from 'styles/theme/colors';

export const LinkContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'flex-start',
  alignItems: 'center',

  svg: {
    color: Colors.primary
  }

  // maxWidth: 420,
  // padding: '30px',
  // [theme.breakpoints.down('sm')]: {
  //   alignItems: 'center'
  // }
}));
