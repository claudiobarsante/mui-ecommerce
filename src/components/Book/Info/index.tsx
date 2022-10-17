import { Typography, Rating } from '@mui/material';
import formatPrice from 'utils/format-price';
import * as S from '../styles';

export default function ProductInfo({ book, isMobile }: any) {
  console.log('book.attributes.price', book.attributes.price);
  return (
    <S.BookInfoContainer>
      {/* <Typography variant={isMobile ? 'h6' : 'h5'} lineHeight={2}>
        {book.attributes.title}
      </Typography> */}
      <Rating
        name="read-only"
        value={book.attributes.rating}
        readOnly
        sx={{ color: '#F4B244' }}
      />
      <Typography variant={isMobile ? 'caption' : 'body1'}>
        ${formatPrice(book.attributes.price)}
      </Typography>
    </S.BookInfoContainer>
  );
}
