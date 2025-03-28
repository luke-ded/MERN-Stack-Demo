import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function IncomeLineChart() {
  const data = {
    labels: [
      'January',
      'Febuary',
      'March',
      'April',
      'May'
    ],
    datasets: [{
      label: 'Expenses',
      data: [3500, 3250, 3000, 3678, 3345],
      hoverOffset: 4
    }]
  };

  const options = {
    type:Line,
    responsive: true,
    backgroundColor: 'black',
    plugins: {
        legend: {
          display: false, // Remove the legend
        },
    },
    scales: {
        y: {
          min: 2000, 
          max: 4000,
        },
    },


  };

  return (
    <div className="flex items-center justify-center p-5">
      <Line options={options} data={data}/>
    </div>
  );
};

export default IncomeLineChart;