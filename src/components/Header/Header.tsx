import { AppBar, Button, Grid, Toolbar, Typography } from '@mui/material';
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
            <Button
              variant='text'
              color='inherit'
              sx={{ fontFamily: 'Inter', fontSize: '1rem', textTransform: 'none' }}
            >
              Main
            </Button>
          </Link>
        </Grid>
        <Grid sx={{ margin: '0 25px' }}>
          <Link
            to={'/exchange'}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <Button
              variant='text'
              color='inherit'
              sx={{ fontFamily: 'Inter', fontSize: '1rem', textTransform: 'none' }}
            >
              Exchange rates
            </Button>
          </Link>
        </Grid>
        <Grid sx={{ margin: '0 25px' }}>
          <Link
            to={'/gold'}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <Button
              variant='text'
              color='inherit'
              sx={{ fontFamily: 'Inter', fontSize: '1rem', textTransform: 'none' }}
            >
              Gold
            </Button>
          </Link>
        </Grid>
        <Grid sx={{ margin: '0 25px' }}>
          <Link
            to={'/historical-exchange'}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <Button
              variant='text'
              color='inherit'
              sx={{ fontFamily: 'Inter', fontSize: '1rem', textTransform: 'none' }}
            >
              Previous exchange rates
            </Button>
          </Link>
        </Grid>
        <Grid sx={{ margin: '0 25px' }}>
          <Link
            to={'/converter'}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <Button
              variant='text'
              color='inherit'
              sx={{ fontFamily: 'Inter', fontSize: '1rem', textTransform: 'none' }}
            >
              Converter
            </Button>
          </Link>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
