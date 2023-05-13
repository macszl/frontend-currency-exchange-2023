import { Button, InputLabel, TextField } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import { Field, Formik } from 'formik';
import { useState } from 'react';

export function CurrencyConvertForm() {
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('GBP');
  const [conversionSuccessful, setConversionSuccessful] = useState(false);
  const [amount, setAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);

  const handleFromCurrencySelectChange = (event: SelectChangeEvent) => {
    setFromCurrency(event.target.value as string);
  };

  const handleToCurrencySelectChange = (event: SelectChangeEvent) => {
    setToCurrency(event.target.value as string);
  };

  const getExchangeRate = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/exchangerates/rates/c/${fromCurrency}`);
    const fromRate = response.data.rates[0].bid;

    const response2 = await axios.get(`${import.meta.env.VITE_API_URL}exchangerates/rates/c/${toCurrency}`);
    const toRate = response2.data.rates[0].ask;

    const rate = toRate / fromRate;

    setExchangeRate(rate);
    setConversionSuccessful(true);
  };

  const validate = (values: { inputCurrency: number; outputCurrency: number }) => {
    return;
  };

  return (
    <>
      <Formik
        enableReinitialize
        validateOnMount={true}
        validateOnChange={true}
        validateOnBlur={true}
        validate={validate}
        initialValues={{ inputCurrency: 0, outputCurrency: 0 }}
        onSubmit={(values) => {
          getExchangeRate();
        }}
      >
        {({ isValid, handleSubmit }) => {
          return (
            <form
              onSubmit={(event) => {
                handleSubmit(event);
              }}
            >
              <Field
                as={TextField}
                label='Amount'
                sx={{ width: 1, backgroundColor: 'white' }}
                name='Amount'
                onChange={setAmount}
                required
              />
              <InputLabel id='from-currency-label'>From:</InputLabel>
              <Select
                labelId='from-currency-label'
                id='from-currency-select'
                label='From'
                value={fromCurrency}
                onChange={handleFromCurrencySelectChange}
              />
              <InputLabel id='to-currency-label'>To:</InputLabel>
              <Select
                labelId='to-currency-label'
                id='to-currency-select'
                label='To'
                value={toCurrency}
                onChange={handleToCurrencySelectChange}
              />

              <Button
                variant='contained'
                color='primary'
                sx={{
                  padding: 1,
                  width: 1,
                }}
                type='submit'
                disabled={!isValid}
              >
                Convert
              </Button>
            </form>
          );
        }}
      </Formik>
      {conversionSuccessful && (
        <div>
          {amount} {fromCurrency} = {amount * exchangeRate} {toCurrency}
        </div>
      )}
    </>
  );
}
