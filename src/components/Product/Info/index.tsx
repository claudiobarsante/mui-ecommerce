import { Typography } from '@mui/material';
import * as S from '../styles';

export default function ProductInfo({ product, isMobile }: any) {
  return (
    <S.ProductInfoContainer>
      <Typography variant={isMobile ? 'h6' : 'h5'} lineHeight={2}>
        {product.name}
      </Typography>
      <Typography variant={isMobile ? 'caption' : 'body1'}>
        ${product.price}
      </Typography>
    </S.ProductInfoContainer>
  );
}
