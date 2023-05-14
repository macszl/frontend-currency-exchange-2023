import { Grid } from '@mui/material';
import { CurrencyHistoryChart } from '../components/CurrencyHistoryChart/CurrencyHistoryChart';
import { Header } from '../components/Header/Header';

export function HistoricalExchangeRateTablePage() {
  return (
    <Grid
      container
      justifyContent={'center'}
      minHeight={'100vh'}
      height={'auto'}
      sx={{ backgroundColor: '#f6f6f2' }}
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
        <CurrencyHistoryChart />
      </Grid>
    </Grid>
  );
}
