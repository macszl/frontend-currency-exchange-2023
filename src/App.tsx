import { Route, Routes } from 'react-router-dom';
import { HistoricalExchangeRateTablePage } from './pages/HistoricalExchangeRateTablePage';
import { CurrencyConverterPage } from './pages/CurrencyConverter';
import { ExchangeRateTablePage } from './pages/ExchangeRateTablePage';
import { GoldPricePage } from './pages/GoldPricePage';
import { MainPage } from './pages/MainPage';
import '@fontsource/inter';
import '@fontsource/roboto';

export function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={<MainPage />}
      />
      <Route
        path='/converter'
        element={<CurrencyConverterPage />}
      />
      <Route
        path='/gold'
        element={<GoldPricePage />}
      />
      <Route
        path='historical-exchange'
        element={<HistoricalExchangeRateTablePage />}
      />
      <Route
        path='exchange'
        element={<ExchangeRateTablePage />}
      />
    </Routes>
  );
}
