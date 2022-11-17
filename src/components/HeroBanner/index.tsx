import { Typography } from '@mui/material';

import * as S from './styles';

export default function HeroBanner() {
  return (
    <S.BannerContainer>
      <S.BannerImage
        src="/images/banner/banner.png"
        alt="Clipart one boy and 2 girls reading books"
      />
      <S.BannerContent>
        <Typography variant="h6">Huge Collection</Typography>
        <S.BannerTitle variant="h2">New Books</S.BannerTitle>
        <S.BannerDescription variant="subtitle1">
          An extensive collection of books carefully selected by our readers.
          From romance to Science fiction, you name it. We have all covered
        </S.BannerDescription>

        <S.BannerShopButton color="primary">Shop Now</S.BannerShopButton>
      </S.BannerContent>
    </S.BannerContainer>
  );
}
