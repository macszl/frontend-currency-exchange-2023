import { Grid } from '@mui/material';
import { Header } from '../components/Header/Header';

export function ExchangeRateTablePage() {
  return (
    <Grid
      container
      justifyContent={'center'}
      height={'100vh'}
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
      >
        <Header />
      </Grid>
    </Grid>
  );
}
