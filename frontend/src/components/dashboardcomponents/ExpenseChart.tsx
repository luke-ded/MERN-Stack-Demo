import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

function ParseLabels()
{
  var data = localStorage.getItem('user_data');
  var parsedData = data ? JSON.parse(data) : null;

  var labels = [];

  for (var i = 0; i < parsedData.User.Expenses.length; i++) 
  {
    var counter = parsedData.User.Expenses[i];
    //console.log(counter.Category);
    labels.push(counter.Category);
  }

  return labels;
}

function ParseData()
{
  var data = localStorage.getItem('user_data');
  var parsedData = data ? JSON.parse(data) : null;

  var datapts = [];

  for (var i = 0; i < parsedData.User.Expenses.length; i++) 
  {
    var counter = parsedData.User.Expenses[i];
    //console.log(counter.Amount);
    datapts.push(counter.Amount);
  }

  return datapts;
}

function ExpenseChart() {
  const data = {
    labels: ParseLabels(),
    datasets: [{
      label: 'Expenses',
      data: ParseData(),
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(54, 235, 166)',
        'rgb(133, 54, 235)'
      ],
      hoverOffset: 15
    }]
  };

  const options = {
    type:Pie,
    responsive: true,


  };

  return (
    <div className="flex items-center justify-center p-5">
      <Pie options={options} data={data}/>
    </div>
  );
};

export default ExpenseChart;