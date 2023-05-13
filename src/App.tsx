import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage';

export function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route
        path='/'
        element={<MainPage />}
      />
    </Routes>
  );
}
