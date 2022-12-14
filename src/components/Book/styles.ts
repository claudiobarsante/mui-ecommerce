import { styled, Theme } from '@mui/material/styles';
import { Button, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { slideInBottom, slideInRight } from '../../animation';
import { Colors } from 'styles/theme/colors';

export const Book = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',

  height: '25rem',
  width: '15rem',
  [theme.breakpoints.up('md')]: {
    position: 'relative'
  }
}));

export const TitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',

  overflow: 'hidden',
  textOverflow: 'ellipsis',

  width: '75%'
}));
export const BookImage = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '12rem',
  width: '8rem',

  margin: '1rem',

  [theme.breakpoints.down('md')]: {
    width: '80%',
    padding: '24px'
  }
}));

export const ActionButton = styled(IconButton)(() => ({
  background: Colors.white,
  margin: 4
}));

type BookFavButtonProps = {
  isfav: number; //has to be all in lower case to avoid Warning: React does not recognize the `isFav` prop on a DOM element
  theme?: Theme;
};

export const FavButton = styled(ActionButton)(
  ({ isfav, theme }: BookFavButtonProps) => ({
    color: isfav ? Colors.primary : Colors.light,
    [theme!.breakpoints?.up('md')]: {
      position: 'absolute',
      right: 0,
      top: 0
    }
  })
);

type AddToCartButtonProps = {
  istoshow: string;
  theme?: Theme;
};
export const AddToCartButton = styled(Button)(
  ({ istoshow, theme }: AddToCartButtonProps) => ({
    width: '120px',
    fontSize: '12px',
    [theme!.breakpoints.up('md')]: {
      position: 'absolute',
      bottom: 0,
      width: '300px',
      padding: '10px 5px',
      animation:
        istoshow === 'true'
          ? `${slideInBottom} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`
          : ''
    },
    background: Colors.primary
  })
);

export const BookInfoContainer = styled(Box)(() => ({
  padding: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

type ActionsButtonsContainerProps = AddToCartButtonProps;
export const ActionsButtonsContainer = styled(Box)(
  ({ istoshow, theme }: ActionsButtonsContainerProps) => ({
    [theme!.breakpoints.up('md')]: {
      display: istoshow === 'true' ? 'visible' : 'none',
      position: 'absolute',
      right: 0,
      top: '20%',
      animation:
        istoshow === 'true'
          ? `${slideInRight} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`
          : ''
    }
  })
);
