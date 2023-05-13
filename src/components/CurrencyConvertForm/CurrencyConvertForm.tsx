import { Button, Grid, InputLabel, MenuItem, TextField, Typography } from '@mui/material';
import Select from '@mui/material/Select';
import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { CurrencyConverterFormErrors } from './CurrencyConverterForm.types';

//todo
//remove this after backend sync gets done

const availableCurrencies = ['USD', 'JPY', 'GBP', 'EUR', 'INR', 'AUD'];

export function CurrencyConvertForm() {
  const [conversionResult, setConversionResult] = useState('');

  const getExchangeRate = async (values: { amount: string; fromCurrency: string; toCurrency: string }) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/exchangerates/rates/c/${values.fromCurrency}`);
    const fromRate = response.data.rates[0].bid;

    const response2 = await axios.get(`${import.meta.env.VITE_API_URL}/exchangerates/rates/c/${values.toCurrency}`);
    const toRate = response2.data.rates[0].ask;

    const rate = fromRate / toRate;

    setConversionResult(`${values.amount} ${values.fromCurrency} = ${Number(values.amount) * rate} ${values.toCurrency}`);
  };

  const validate = (values: { amount: string }) => {
    const errors: CurrencyConverterFormErrors = {};

    if (!values.amount || isNaN(parseFloat(values.amount))) {
      errors.amount = 'Please enter a valid number';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      amount: '0',
      fromCurrency: availableCurrencies[0],
      toCurrency: availableCurrencies[1],
    },
    validate: validate,
    onSubmit: (values) => {
      getExchangeRate(values);
    },
  });

  return (
    <Grid>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id='amount'
          name='amount'
          label='Amount'
          type='number'
          value={formik.values.amount}
          onChange={formik.handleChange}
          error={formik.touched.amount && Boolean(formik.errors.amount)}
        />
        <InputLabel id='from-currency-label'>From:</InputLabel>
        <Select
          id='from-currency-select'
          name='fromCurrency'
          label='From'
          value={formik.values.fromCurrency || ''}
          onChange={formik.handleChange}
          error={formik.touched.fromCurrency && Boolean(formik.errors.fromCurrency)}
        >
          {availableCurrencies.map((item, index) => {
            return (
              <MenuItem
                value={item}
                key={index}
              >
                {item}
              </MenuItem>
            );
          })}
        </Select>
        <InputLabel id='to-currency-label'>To:</InputLabel>
        <Select
          id='to-currency-select'
          name='toCurrency'
          label='To'
          value={formik.values.toCurrency}
          onChange={formik.handleChange}
          error={formik.touched.toCurrency && Boolean(formik.errors.toCurrency)}
        >
          {availableCurrencies.map((item, index) => {
            return (
              <MenuItem
                value={item}
                key={index}
              >
                {item}
              </MenuItem>
            );
          })}
        </Select>

        <Button
          variant='contained'
          color='primary'
          sx={{
            padding: 1,
            width: 1,
          }}
          type='submit'
          disabled={formik.errors.amount ? true : false}
        >
          Convert
        </Button>
        {conversionResult && <Typography> {conversionResult}</Typography>}
      </form>
    </Grid>
  );
}
