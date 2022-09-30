import { styled, Theme } from '@mui/material/styles';
import { Button, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { slideInBottom, slideInRight } from '../../animation';
import { Colors } from 'styles/theme/colors';

export const Product = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    position: 'relative'
  }
}));

export const ProductImage = styled('img')(({ src, theme }) => ({
  src: `url(${src})`,
  width: '100%',

  background: Colors.light_gray,
  padding: '10px',
  [theme.breakpoints.down('md')]: {
    width: '80%',
    padding: '24px'
  }
}));

export const ActionButton = styled(IconButton)(() => ({
  background: Colors.white,
  margin: 4
}));

type ProductFavButtonProps = {
  isfav: number; //has to be all in lower case to avoid Warning: React does not recognize the `isFav` prop on a DOM element
  theme?: Theme;
};

export const FavButton = styled(ActionButton)(
  ({ isfav, theme }: ProductFavButtonProps) => ({
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
      bottom: '2%',
      width: '300px',
      padding: '10px 5px',
      animation:
        istoshow === 'true'
          ? `${slideInBottom} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`
          : ''
    },
    background: Colors.secondary,
    opacity: 0.9
  })
);

export const ProductInfoContainer = styled(Box)(() => ({
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
