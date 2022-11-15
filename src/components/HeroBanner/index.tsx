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
          Torem ipsum dolor sit amet, consectetur adipisicing elitsed do eiusmo
          tempor incididunt ut labore et dolore magna
        </S.BannerDescription>

        <S.BannerShopButton color="primary">Shop Now</S.BannerShopButton>
      </S.BannerContent>
    </S.BannerContainer>
  );
}
