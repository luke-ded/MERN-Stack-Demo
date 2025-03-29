import ExpenseChart from '../components/dashboardcomponents/ExpenseChart.tsx';
import IncomeChart from '../components/dashboardcomponents/IncomeChart.tsx';
import IncomeLineChart from '../components/dashboardcomponents/IncomeLineChart.tsx';
import GoalProgress from '../components/dashboardcomponents/GoalProgress.tsx';
import NavBar from '../components/NavBar.tsx';


const DashboardPage = () => {
    const percentage = 60;
    const rewardName = "rewardName";

    return (
    <div className="flex flex-col absolute top-0 left-0 h-[200vh]">
        <NavBar />

        <div className="flex justify-start mt-[8vh]">
            <div className= "ml-8 w-[50vh] min-h-fit h-[50vh] border border-[#6d91e8] rounded-[2%] text-center bg-[rgba(17,18,23,.9)]">
                <h3 className="font-[Lucida Sans] font-bold text-2xl text-[#6d91e8] mt-3">Expenses</h3>
                <ExpenseChart />
            </div>

            <div className= "ml-8 w-[50vh] min-h-fit h-[50vh] border border-[#6d91e8] rounded-[2%] text-center bg-[rgba(17,18,23,.9)]">
            <h3 className="font-[Lucida Sans] font-bold text-2xl text-[#6d91e8] mt-3">Income</h3>
                <IncomeChart />
            </div>

            <div className= "ml-8 w-[24.5vw] min-h-[50vh] h-[50vh] border border-[#6d91e8] rounded-[2%] text-center bg-[rgba(17,18,23,.9)]">
            <h3 className="font-[Lucida Sans] font-bold text-2xl text-[#6d91e8] mt-3">Statistics</h3>

            <div className="mt-4 ml-4 text-left font-[Lucida Sans]">
                <p className="text-[#ff6384]">Total Debt:</p>
                <p className="text-[#36eba6]">Total savings: </p>
                <p>Spending this month:</p>
                <p>% spending on essentials: </p>
                <p>Need more ideas for this: </p>
            </div>
            
                
            </div>
        </div>

        {/* This is super rough */}
        <div className="flex justify-start w-[85vw] mt-[8vh] ">
            <div className= "ml-8 w-[50vh] min-h-fit h-[50vh] border border-[#6d91e8] rounded-[2%] text-center bg-[rgba(17,18,23,.9)]">
                <div className="flex w-[50vh%] absolute z-0">
                    <GoalProgress />
                    
                </div>
                <h3 className="font-[Lucida Sans] font-bold text-2xl text-[#6d91e8] mt-3">Reward</h3>
                
                <div className='mt-10'>
                    <h5 style={{color: percentage > 50 ? "rgb(54, 235, 166)" : "rgb(255, 99, 132)"}}> 
                        You are {percentage}% of the way to your reward, {rewardName}!</h5>
                </div>
            </div>

            <div className= "ml-8 w-[50vw] min-h-fit h-[40vh] border border-[#6d91e8] rounded-lg text-center bg-white/90">
                <h3 className="font-[Lucida Sans] font-bold text-2xl text-[#6d91e8] mt-3">Expenses</h3>
                <IncomeLineChart />
            </div>
        </div>

        <div className="w-[10vw] min-h-fit h-[90vh] border border-[#6d91e8] rounded-lg text-center bg-[rgba(17,18,23,.9)] fixed top-[8vh] right-8">
            <h3 className="font-[Lucida Sans] font-bold text-2xl text-[#6d91e8] mt-3">Depth</h3>
            <p className="mt-10 m-2">(replace this with a graphic designed depth meter)</p>
        </div>

        <div className="flex justify-start w-[85vw] mt-[8vh]">
            <div className= "ml-8 w-[50vh] min-h-fit h-[50vh] border border-[#6d91e8] rounded-[2%] text-center bg-[rgba(17,18,23,.9)]">
                <h3 className="font-[Lucida Sans] font-bold text-2xl text-[#6d91e8] mt-3">Another Module</h3>
            </div>

            <div className= "ml-8 w-[50vw] min-h-fit h-[40vh] border border-[#6d91e8] rounded-lg text-center bg-white/90">
                <h3 className="font-[Lucida Sans] font-bold text-2xl text-[#6d91e8] mt-3">Income</h3>
                <IncomeLineChart />
            </div>
        </div>
        
    </div>
    );
    };

export default DashboardPage;