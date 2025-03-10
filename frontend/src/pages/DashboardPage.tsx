import DoughnutChart from '../components/dashboardcomponents/DoughnutChart.tsx';
import GoalProgress from '../components/dashboardcomponents/GoalProgress.tsx';
import NavBar from '../components/NavBar.tsx';
import app from './App.module.css';
import dashapp from '../components/dashboardcomponents/dashboard.module.css'


// Luke is working on this page, please don't edit!!
const DashboardPage = () => {
    const percentage = 60;
  return (
    <div>
        <NavBar />

        <div className={dashapp.dashboardDiv} id={dashapp.expensesdoughnut}>
            <h3 id={dashapp.chartlabel}>Expenses</h3>
            <DoughnutChart />
        </div>

        <div className={dashapp.dashboardDiv} id={dashapp.incomedoughnut}>
            <h3 id={dashapp.chartlabel}>Income</h3>
            <DoughnutChart />
        </div>

        {/* This is super rough */}
        <div className={dashapp.dashboardDiv} id={dashapp.goal}>
            <h3 id={dashapp.chartlabel}>Goal</h3>
            <div id={app.goalmessagewrapper}>
                <GoalProgress />
                <h5 id={dashapp.goalmessage} style={{color: percentage > 50 ? "rgb(54, 235, 166)" : "rgb(255, 99, 132)"}}> 
                    You are {percentage}% of the way to your goal!</h5>
            </div>
        </div>

    </div>
  );
};

export default DashboardPage;
