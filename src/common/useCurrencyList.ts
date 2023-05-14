import axios from 'axios';
import { useEffect, useState } from 'react';

export function useCurrencyList() {
  const [currencyList, setCurrencyList] = useState<string[]>([]);

  useEffect(() => {
    const fetchCurrencyList = async () => {
      const api_url = `${import.meta.env.VITE_API_URL}/exchangerates/tables/a/`;
      const response = await axios.get(api_url);
      const rates: { currency: string; code: string; mid: number }[] = response.data[0].rates;
      const currencyCodes = rates.map((rate) => {
        return rate.code;
      });

      setCurrencyList(currencyCodes);
    };

    fetchCurrencyList();
  }, []);

  return currencyList;
}
