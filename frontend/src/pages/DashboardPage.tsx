import ExpenseChart from '../components/dashboardcomponents/ExpenseChart.tsx';
import IncomeChart from '../components/dashboardcomponents/IncomeChart.tsx';
import IncomeLineChart from '../components/dashboardcomponents/IncomeLineChart.tsx';
import ExpensesLineChart from '../components/dashboardcomponents/ExpensesLineChart.tsx';
import GoalProgress from '../components/dashboardcomponents/GoalProgress.tsx';
import ExpensesList from '../components/dashboardcomponents/ExpensesList.tsx';
import IncomeList from '../components/dashboardcomponents/IncomeList.tsx';
import DebtList from '../components/dashboardcomponents/DebtList.tsx';
import StatList from '../components/dashboardcomponents/StatList.tsx';
import NavBar from '../components/NavBar.tsx';


const DashboardPage = () => {
    const percentage = 60;
    const rewardName = "rewardName";

    //console.log(localStorage.getItem('token'));

    return (
    <div className="flex flex-col absolute top-0 left-0 h-[300vh]">
        <NavBar />

        <div className="w-[10vw] min-h-fit h-[90vh] border border-[#6d91e8] rounded-lg text-center bg-[rgba(17,18,23,.9)] fixed top-[8vh] right-8">
            <h3 className="font-[Lucida Sans] font-bold text-2xl text-[#6d91e8] mt-3">Depth</h3>
            <p className="mt-10 m-2">(replace this with a graphic designed depth meter)</p>
            <p className='mt-5 m-2'>should this be fixed like it is now, or extend way down the entire page and be scrollable?</p>
        </div>

        <div className="flex justify-between mt-[8vh]">
            <div className= "ml-8 w-[50vh] min-h-fit h-[60vh] border border-[#6d91e8] rounded-[2%] text-center bg-[rgba(17,18,23,.9)]">
                <h3 className="font-[Lucida Sans] font-bold text-2xl text-[#6d91e8] mt-3">Expenses</h3>
                <ExpenseChart />
            </div>

            <div className= "ml-8 w-[50vh] min-h-fit h-[60vh] border border-[#6d91e8] rounded-[2%] text-center bg-[rgba(17,18,23,.9)]">
            <h3 className="font-[Lucida Sans] font-bold text-2xl text-[#6d91e8] mt-3">Income</h3>
                <IncomeChart />
            </div>

            <div className= "flex-col ml-8 w-[20vw] h-[60vh] border border-[#6d91e8] rounded-[2%] bg-[rgba(17,18,23,.9)]">
                <div className="flex h-[10%] items-center justify-center border-b border-[#6d91e8]">
                    <h3 className="font-[Lucida Sans] font-bold text-2xl text-[#6d91e8]">Statistics</h3>
                </div>
                <div className="flex flex-col w-[100%] h-[90%] rounded-lg grow min-h-0">
                    <StatList/>
                </div>
            </div>
        </div>

        {/* Fix Scaling Here!! */}
        <div className="flex justify-between w-[85vw] mt-[8vh]">
            <div className= "flex-col ml-8 w-[50vh] h-[60vh] border border-[#6d91e8] rounded-[2%] bg-[rgba(17,18,23,.9)]">
                <div className="flex h-[10%] items-center justify-center border-b border-[#6d91e8]">
                    <h3 className="font-[Lucida Sans] font-bold text-2xl text-[#6d91e8]">Recent Expenses</h3>
                </div>
                <div className="flex flex-col w-[100%] h-[90%] rounded-lg overflow-y-scroll grow min-h-0">
                    <ExpensesList/>
                </div>
            </div>

            <div className= "ml-8 w-[50vw] min-h-fit h-[60vh] border border-[#6d91e8] rounded-lg text-center bg-white/90">
                <h3 className="font-[Lucida Sans] font-bold text-2xl text-[#6d91e8] mt-3">Total Expenses by Month</h3>
                <ExpensesLineChart />
            </div>
        </div>


        <div className="flex justify-between w-[85vw] mt-[8vh]">
            <div className= "flex-col ml-8 w-[50vh] h-[60vh] border border-[#6d91e8] rounded-[2%] bg-[rgba(17,18,23,.9)]">
                <div className="flex h-[10%] items-center justify-center border-b border-[#6d91e8]">
                    <h3 className="font-[Lucida Sans] font-bold text-2xl text-[#6d91e8]">Recent Income</h3>
                </div>
                <div className="flex flex-col w-[100%] h-[90%] rounded-lg overflow-y-scroll grow min-h-0">
                    <IncomeList/>
                </div>
            </div>

            <div className= "w-[50vw] min-h-fit h-[60vh] border border-[#6d91e8] rounded-lg text-center bg-white/90">
                <h3 className="font-[Lucida Sans] font-bold text-2xl text-[#6d91e8] mt-3">Total Income by Month</h3>
                <IncomeLineChart />
            </div>
        </div>
        

        <div className="flex justify-between w-[85vw] mt-[8vh]">
            <div className= "flex-col ml-8 w-[50vh] h-[60vh] border border-[#6d91e8] rounded-[2%] bg-[rgba(17,18,23,.9)]">
                <div className="flex h-[10%] items-center justify-center border-b border-[#6d91e8]">
                    <h3 className="font-[Lucida Sans] font-bold text-2xl text-[#6d91e8]">Top Debts</h3>
                </div>
                <div className="flex flex-col w-[100%] h-[90%] rounded-lg overflow-y-scroll grow min-h-0">
                    <DebtList/>
                </div>
            </div>

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

        </div>
    </div>
    );
    };

export default DashboardPage;