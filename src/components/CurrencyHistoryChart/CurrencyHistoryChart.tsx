import { Autocomplete, Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCurrencyList } from '../../common/useCurrencyList';

export function CurrencyHistoryChart() {
  const availableCurrencies = useCurrencyList();
  const [chosenCurrency, setChosenCurrency] = useState<string>('USD');

  useEffect(() => {}, [chosenCurrency]);
  return (
    <Grid marginTop={4}>
      <Autocomplete
        id='currency-select'
        options={availableCurrencies.length > 0 ? availableCurrencies : []}
        value={chosenCurrency}
        onChange={(_, value) => {
          if (!value) {
            setChosenCurrency('');
          } else {
            setChosenCurrency(value as string);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Choose currency'
          ></TextField>
        )}
      ></Autocomplete>
    </Grid>
  );
}
