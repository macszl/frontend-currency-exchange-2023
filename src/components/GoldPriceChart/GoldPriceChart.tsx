import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};

export function GoldPriceChart() {
  return (
    <>
      <div className='header'>
        <h1 className='title'>Line Chart</h1>
      </div>
      <Chart
        type='line'
        data={data}
      />
      ;
    </>
  );
}
