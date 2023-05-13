import { AppBar, Grid, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <AppBar
      position={'sticky'}
      sx={{ backgroundColor: '#388087', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
    >
      <Toolbar>
        <Grid sx={{ margin: '0 25px' }}>
          <Link
            to={'/'}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <Typography>Main</Typography>
          </Link>
        </Grid>
        <Grid sx={{ margin: '0 25px' }}>
          <Link
            to={'/exchange'}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <Typography>Exchange rates</Typography>
          </Link>
        </Grid>
        <Grid sx={{ margin: '0 25px' }}>
          <Link
            to={'/gold'}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <Typography>Gold</Typography>
          </Link>
        </Grid>
        <Grid sx={{ margin: '0 25px' }}>
          <Link
            to={'/historical-exchange'}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <Typography>Previous exchange rates</Typography>
          </Link>
        </Grid>
        <Grid sx={{ margin: '0 25px' }}>
          <Link
            to={'/converter'}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <Typography>Converter</Typography>
          </Link>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
