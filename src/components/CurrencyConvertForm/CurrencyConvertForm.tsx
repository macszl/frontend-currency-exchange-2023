import { Autocomplete, Button, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { CurrencyConverterFormErrors } from './CurrencyConverterForm.types';

//todo
//remove this after backend sync gets done

const availableCurrencies = ['USD', 'JPY', 'GBP', 'EUR', 'AUD'];

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

    if (!values.amount || isNaN(parseFloat(values.amount)) || parseFloat(values.amount) <= 0) {
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
        <Autocomplete
          id='from-currency-select'
          options={availableCurrencies.length > 0 ? availableCurrencies : []}
          getOptionLabel={(option) => option || ''}
          value={formik.values.fromCurrency}
          onChange={(_, value) => formik.setFieldValue('fromCurrency', value)}
          onBlur={formik.handleBlur}
          renderInput={(params) => (
            <TextField
              {...params}
              label='From'
              name='fromCurrency'
              id='fromCurrency'
              value={formik.values.fromCurrency}
              error={formik.touched.fromCurrency && Boolean(formik.errors.fromCurrency)}
              onBlur={formik.handleBlur}
              helperText={formik.touched.fromCurrency && formik.errors.fromCurrency}
            />
          )}
        />

        <Autocomplete
          id='to-currency-select'
          options={availableCurrencies.length > 0 ? availableCurrencies : []}
          getOptionLabel={(option) => option || ''}
          onChange={(_, value) => formik.setFieldValue('toCurrency', value)}
          onBlur={formik.handleBlur}
          renderInput={(params) => (
            <TextField
              {...params}
              label='To'
              name='toCurrency'
              id='toCurrency'
              value={formik.values.toCurrency}
              error={formik.touched.toCurrency && Boolean(formik.errors.toCurrency)}
              onBlur={formik.handleBlur}
              helperText={formik.touched.toCurrency && formik.errors.toCurrency}
            />
          )}
        />

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
