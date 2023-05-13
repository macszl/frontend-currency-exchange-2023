import axios from 'axios';
import 'chart.js/auto';
import { useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import { ButtonStuffType, TimeFrameType } from './GoldPriceChart.types';

const buttonStuff: ButtonStuffType = {
  '2w': 14,
  '1m': 31,
  '3m': 93,
  '6m': 185,
  '1y': 365,
  '2y': 730,
  '5y': 1825,
};

const timeframe: TimeFrameType = {
  14: 14,
  31: 31,
  93: 31,
  185: 31,
  365: 31,
  730: 31,
  1825: 31,
};

export function GoldPriceChart() {
  const [goldPrices, setGoldPrices] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [mode, setMode] = useState<keyof ButtonStuffType>('1m');

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

  useEffect(() => {
    async function fetchGoldPrices() {
      const baseUrl = `${import.meta.env.VITE_API_URL}/cenyzlota`;

      const totalDays = buttonStuff[mode];
      const dataPoints = timeframe[totalDays];
      const endDate = new Date().toISOString().slice(0, 10);

      // Calculate the start date based on the number of data points and the end date

      const startDate = new Date(Date.now() - totalDays * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

      const urls = [];
      const dateLabels = [];
      urls.push(`${baseUrl}/${startDate}/`);
      dateLabels.push(startDate);
      for (let i = 0; i < dataPoints; i++) {
        // Add a proportional number of days to the start date for each data point
        const daysToAdd = Math.floor((i + 1) * (totalDays / dataPoints));
        const date = new Date(new Date(startDate).getTime() + daysToAdd * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
        urls.push(`${baseUrl}/${date}/`);
        dateLabels.push(date);
      }

      const promises = urls.map((url) => axios.get(url));
      const results = await Promise.allSettled(promises);

      const prices: number[] = results.map(
        (result) => {
          if (result.status === 'fulfilled') {
            return result.value.data[0].cena;
          } else {
            return -1;
          }
        },
        [mode]
      );

      const filteredDateArray = dateLabels.filter((_, index) => prices[index] !== -1);
      const filteredPricesArray = prices.filter((price) => price !== -1);
      setGoldPrices(filteredPricesArray);
      setLabels(filteredDateArray);

      const updatedData = {
        labels: filteredDateArray,
        datasets: [
          {
            label: 'Gold price',
            data: filteredPricesArray,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      };

      setData(updatedData);
    }

    fetchGoldPrices();
  }, [mode]);

  return (
    <>
      <div className='header'>
        <h1 className='title'>Line Chart</h1>
      </div>
      {Object.keys(buttonStuff).map((key, index) => (
        <button
          key={index}
          onClick={() => {
            setMode(key as keyof ButtonStuffType);
          }}
        >
          {key}
        </button>
      ))}
      <Chart
        type='line'
        data={data}
      />
      ;
    </>
  );
}
