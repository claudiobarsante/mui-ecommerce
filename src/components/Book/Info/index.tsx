import { Typography, Rating } from '@mui/material';
import formatPrice from 'utils/format-price';
import * as S from '../styles';
import { Colors } from 'styles/theme/colors';
export default function ProductInfo({ book, isMobile }: any) {
  return (
    <S.BookInfoContainer>
      {/* <Typography variant={isMobile ? 'h6' : 'h5'} lineHeight={2}>
        {book.attributes.title}
      </Typography> */}
      <Rating
        name="read-only"
        value={book.attributes.rating}
        readOnly
        sx={{ color: Colors.primary }}
      />
      <Typography variant={isMobile ? 'caption' : 'body1'}>
        ${formatPrice(book.attributes.price)}
      </Typography>
    </S.BookInfoContainer>
  );
}
