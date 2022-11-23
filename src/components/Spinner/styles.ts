import { styled, Theme } from '@mui/material/styles';

import SvgIcon from '@mui/material/SvgIcon';
import { Colors } from 'styles/theme/colors';

type Props = {
  customcolor: keyof typeof Colors; //always in lowercase
  theme?: Theme;
};
export const Wrapper = styled(SvgIcon)(({ customcolor }: Props) => ({
  stroke: Colors[customcolor],
  padding: '0.1rem'
  //margin: '0.2rem'
}));
