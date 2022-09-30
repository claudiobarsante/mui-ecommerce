import { Typography } from '@mui/material';

import * as S from './styles';

export default function HeroBanner() {
  return (
    <S.BannerContainer>
      <S.BannerImage
        src="/images/banner/banner.png"
        alt="Picture of a dog inside a purse"
      />
      <S.BannerContent>
        <Typography variant="h6">Huge Collection</Typography>
        <S.BannerTitle variant="h2">New Bags</S.BannerTitle>
        <S.BannerDescription variant="subtitle1">
          Torem ipsum dolor sit amet, consectetur adipisicing elitsed do eiusmo
          tempor incididunt ut labore et dolore magna
        </S.BannerDescription>

        <S.BannerShopButton color="primary">Shop Now</S.BannerShopButton>
      </S.BannerContent>
    </S.BannerContainer>
  );
}
