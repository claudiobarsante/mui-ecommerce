import { styled, Theme } from '@mui/material/styles';
import { IconButton } from '@mui/material';

import { Colors } from 'styles/theme/colors';

export const ActionButton = styled(IconButton)(() => ({
  background: Colors.white,
  margin: 4
}));

export type BookFavButtonProps = {
  isfav: string; //has to be all in lower case to avoid Warning: React does not recognize the `isFav` prop on a DOM element
  theme?: Theme;
};

export const FavButton = styled(ActionButton)(
  ({ isfav, theme }: BookFavButtonProps) => ({
    color: isfav === 'true' ? Colors.primary : Colors.light,
    [theme!.breakpoints?.up('md')]: {
      position: 'absolute',
      right: 0,
      top: 0
    }
  })
);
