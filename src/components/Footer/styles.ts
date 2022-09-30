import styled from '@emotion/styled';
import { TextField, Typography } from '@mui/material';
import { Colors } from 'styles/theme/colors';

export const FooterTitle = styled(Typography)(() => ({
  textTransform: 'uppercase',
  marginBottom: '1em'
}));

export const SubscribeTextField = styled(TextField)(() => ({
  '.MuiInputLabel-root': {
    color: Colors.secondary
  },

  '.MuiInput-root::before': {
    borderBottom: `1px solid ${Colors.secondary}`
  }
}));
