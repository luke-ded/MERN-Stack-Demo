import { Doughnut } from "react-chartjs-2";
import dashapp from "./dashboard.module.css";
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

function DoughnutChart() {
  const data = {
    labels: [
      'Red',
      'Blue',
      'Yellow',
      'Green',
      'Purple'
    ],
    datasets: [{
      label: 'Expenses',
      data: [300, 50, 100, 20, 80],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(54, 235, 166)',
        'rgb(133, 54, 235)'
      ],
      hoverOffset: 4
    }]
  };

  const options = {
    type:Doughnut,
    responsive: true,
    cutout: "50%",


  };

  return (
    <div id={dashapp.doughnutchart}>
      <Doughnut options={options} data={data}/>
    </div>
  );
};

export default DoughnutChart;