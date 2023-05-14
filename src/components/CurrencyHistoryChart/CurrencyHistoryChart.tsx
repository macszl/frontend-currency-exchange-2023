import { Autocomplete, CircularProgress, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';

export function CurrencyHistoryChart() {
  const [availableCurrencies, setAvailableCurrencies] = useState<string[]>([]);
  const [chosenCurrency, setChosenCurrency] = useState<string>('USD');
  const [data, setData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      fill: boolean;
      borderColor: string;
      tension: number;
    }[];
  }>({ labels: [], datasets: [] });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCurrencyList = async () => {
      const api_url = `${import.meta.env.VITE_API_URL}/exchangerates/tables/a/`;
      try {
        const response = await axios.get(api_url);
        const rates: { currency: string; code: string; mid: number }[] = response.data[0].rates;
        const currencyCodes = rates.map((rate) => {
          return rate.code;
        });

        const searchParams = new URLSearchParams(location.search);
        const currencyParam = searchParams.get('currency');
        if (currencyParam && currencyCodes.includes(currencyParam)) {
          setChosenCurrency(currencyParam);
        } else {
          setChosenCurrency('USD');
        }

        setAvailableCurrencies(currencyCodes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCurrencyList();
  }, []);

  useEffect(() => {
    async function getCurrencyExchangeRates() {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/exchangerates/rates/a/${chosenCurrency}/last/14/`);
        const rates = response.data.rates;

        const filteredDateArray = rates.map((rate: { effectiveDate: string }) => rate.effectiveDate);
        const filteredPricesArray = rates.map((rate: { mid: number }) => rate.mid);

        if (chosenCurrency != 'USD' && (!chosenCurrency || !availableCurrencies.includes(chosenCurrency))) {
          // handle case where chosen currency is not available
          return;
        }

        const updatedData = {
          labels: filteredDateArray,
          datasets: [
            {
              label: 'Exchange rate(PLN/1 unit of currency)',
              data: filteredPricesArray,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        };

        setData(updatedData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getCurrencyExchangeRates();
  }, [chosenCurrency]);

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
          />
        )}
      />

      {isLoading ? (
        <CircularProgress />
      ) : (
        <Chart
          type='line'
          data={data}
          options={{
            scales: { y: { beginAtZero: true } },
          }}
        />
      )}
    </Grid>
  );
}
