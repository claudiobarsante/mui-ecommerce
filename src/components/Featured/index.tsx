import { Container, Grid } from '@mui/material';
import useIsMobile from 'hooks/use-IsMobile';
import { products } from '../../data';
import SingleProductMobile from 'components/Product/Mobile';

import SingleProductDesktop from 'components/Product/Desktop';

export default function Products() {
  const isMobile = useIsMobile();

  const renderProducts = products.map((product) => (
    <Grid
      item
      key={product.id}
      xs={2}
      sm={4}
      display="flex"
      flexDirection={'column'}
      justifyContent="center"
      alignItems="center"
      padding={'10px'}
    >
      {isMobile ? (
        <SingleProductMobile product={product} isMobile={isMobile} />
      ) : (
        <SingleProductDesktop product={product} isMobile={isMobile} />
      )}
    </Grid>
  ));
  return (
    <Container>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        justifyContent="center"
        sx={{ margin: `20px 4px 10px 4px` }}
        columns={{ xs: 2, sm: 8, md: 12 }}
      >
        {renderProducts}
      </Grid>
    </Container>
  );
}
