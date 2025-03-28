import DoughnutChart from '../components/dashboardcomponents/DoughnutChart.tsx';
import GoalProgress from '../components/dashboardcomponents/GoalProgress.tsx';
import NavBar from '../components/NavBar.tsx';
import app from './App.module.css';
import dashapp from '../components/dashboardcomponents/dashboard.module.css'


// Luke is working on this page, please DO NOT edit!!!!!!!!!!!!!!!!!!!!!!!!!!!
const DashboardPage = () => {
    const percentage = 60;
    const rewardName = "rewardName";

    return (
    <div className="flex flex-col absolute top-0 left-0 h-screen w-screen bg-yellow-400/50">
        <NavBar />

        <div className="flex justify-start mt-[8vh] bg-red-400/50">
            <div className= "ml-8 w-[50vh] min-h-fit h-[50vh] border border-[#6d91e8] rounded-[2%] text-center bg-[rgba(17,18,23,.9)]">
        <       h3 className="font-[Lucida Sans] font-bold text-2xl text-[#6d91e8] mt-3">Expenses</h3>
                <DoughnutChart />
            </div>

            <div className= "ml-8 w-[50vh] min-h-fit h-[50vh] border border-[#6d91e8] rounded-[2%] text-center bg-[rgba(17,18,23,.9)]">
            <h3 className="font-[Lucida Sans] font-bold text-2xl text-[#6d91e8] mt-3">Income</h3>
                <DoughnutChart />
            </div>
        </div>

        {/* This is super rough */}
        <div className= "mt-8 ml-8 w-[50vh] min-h-fit h-[50vh] border border-[#6d91e8] rounded-[2%] text-center bg-[rgba(17,18,23,.9)]">
            <div className="flex w-[100%] bg-orange-400/50 absolute z-0">
                <GoalProgress />
                
            </div>
            <h3 className="font-[Lucida Sans] font-bold text-2xl text-[#6d91e8] mt-3">Reward</h3>
            
            <div >
                <h5 style={{color: percentage > 50 ? "rgb(54, 235, 166)" : "rgb(255, 99, 132)"}}> 
                    You are {percentage}% of the way to your reward, {rewardName}!</h5>
            </div>
        </div>

        {/* <div className={dashapp.dashboardDiv} id={dashapp.depthmeter}>
            <h3 id={dashapp.chartlabel}>Depth</h3>
        </div> */}
        
    </div>
    );
    };

export default DashboardPage;