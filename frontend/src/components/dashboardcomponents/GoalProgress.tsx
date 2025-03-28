import { Pie } from "react-chartjs-2";
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

// Register required components for Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

function GoalProgress() {
  const data = {
    datasets: [{
      label: 'Expenses',
      data: [60, 40],
      backgroundColor: [
        'rgb(54, 235, 166)',
        'transparent'
      ],
      hoverOffset: 4
    }]
  };

  const options = {
    type:Pie,
    responsive: true,
    borderWidth:0,


  };

  return (
    <div className="h-[5vh] ml-2 mt-2">
      <Pie options={options} data={data}/>
    </div>
  );
};

export default GoalProgress;