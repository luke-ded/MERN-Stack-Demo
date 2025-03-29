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

function ParseData()
{
  var data = localStorage.getItem('user_data');
  var parsedData = data ? JSON.parse(data) : null;

  // This may need to be changed depending on time frame moving ability
  var datapts = new Array(13).fill(0);

  for (var i = 0; i < parsedData.User.Income.length; i++) 
  {
    var counter = parsedData.User.Income[i];
    console.log(counter.Amount);
    datapts[counter.TimeFrame] += counter.Amount;
  }

  return [3500, 3250, 3000, 3678, 3345]; // Change to datapoints
}

function IncomeLineChart() {
  const data = {
    labels: [
      'January',
      'Febuary',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [{
      label: 'Expenses',
      data: ParseData(),
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