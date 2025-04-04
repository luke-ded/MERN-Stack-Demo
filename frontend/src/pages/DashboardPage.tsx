import ExpenseChart from '../components/dashboardcomponents/ExpenseChart.tsx';
import IncomeChart from '../components/dashboardcomponents/IncomeChart.tsx';
import IncomeLineChart from '../components/dashboardcomponents/IncomeLineChart.tsx';
import ExpensesLineChart from '../components/dashboardcomponents/ExpensesLineChart.tsx';
import GoalProgress from '../components/dashboardcomponents/GoalProgress.tsx';
import ExpensesList from '../components/dashboardcomponents/ExpensesList.tsx';
import NavBar from '../components/NavBar.tsx';
import {useState} from 'react'

const today = new Date();
interface Item 
{
    key:string;
    Name: string;
    Date: any;
}

function setExpenses()
{
    var data = localStorage.getItem('user_data');
    var parsedData = data ? JSON.parse(data) : null;

    let expenses = new Array<Item>();

    for (var i = 0; i < parsedData.User.Expenses.length; i++) 
    {
        let newItem:Item = {"Name":"", "Date":{"Month":1, "Day":1, "Year":2023}, "key":""};
        var counter = parsedData.User.Expenses[i];

        newItem.key = i.toString(); 
        newItem.Name = counter.Name;

        if(counter.InitialTime != undefined)
            newItem.Date = counter.InitialTime;
        else
            newItem.Date = {"Month":1, "Day":1, "Year":2023};

        expenses.push(newItem);
    }
    
    expenses.sort((a, b) => Date.UTC(b.Date.Year, b.Date.Month - 1, b.Date.Day) 
    - Date.UTC(a.Date.Year, a.Date.Month - 1, a.Date.Day));

    return expenses.slice(0, 20); // Return most recent 10 items
}

// via https://stackoverflow.com/questions/2050805/getting-day-suffix-when-using-datetime-tostring
function GetDaySuffix(day:any)
{
    switch (day)
    {
        case 1:
        case 21:
        case 31:
            return "st";
        case 2:
        case 22:
            return "nd";
        case 3:
        case 23:
            return "rd";
        default:
            return "th";
    }
}

const renderExpenseItem = (item: Item): React.ReactNode => 
{
    var months = [ "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December" ];

    let old = new Date(Date.UTC(item.Date.Year, item.Date.Month - 1, item.Date.Day));
    let daysago = Math.floor((today.getTime() - old.getTime()) / 86400000);

    return (
        <div>
            <div className="flex justify-between items-center">
                <span className="font-semibold text-md">{item.Name}</span>
                <span className="text-gray-500 text-xs"> {daysago > 30 ? months[item.Date.Month - 1] + " " + item.Date.Day + GetDaySuffix(item.Date.Day): daysago + " Days Ago"}</span>
            </div>
        </div>
    );
};

const DashboardPage = () => {
    const percentage = 60;
    const rewardName = "rewardName";

    var data = localStorage.getItem('user_data');
    var parsedData = data ? JSON.parse(data) : null;
    var expenses = setExpenses();
    
    return (
    <div className="flex flex-col absolute top-0 left-0 h-[300vh]">
        <NavBar />

        <div className="flex justify-between mt-[8vh]">
            <div className= "ml-8 w-[50vh] min-h-fit h-[50vh] border border-[#6d91e8] rounded-[2%] text-center bg-[rgba(17,18,23,.9)]">
                <h3 className="font-[Lucida Sans] font-bold text-2xl text-[#6d91e8] mt-3">Expenses</h3>
                <ExpenseChart />
            </div>

            <div className= "ml-8 w-[50vh] min-h-fit h-[50vh] border border-[#6d91e8] rounded-[2%] text-center bg-[rgba(17,18,23,.9)]">
            <h3 className="font-[Lucida Sans] font-bold text-2xl text-[#6d91e8] mt-3">Income</h3>
                <IncomeChart />
            </div>

            <div className= "ml-8 w-[16.5vw] min-h-[50vh] h-[50vh] border border-[#6d91e8] rounded-[2%] text-center bg-[rgba(17,18,23,.9)]">
                <h3 className="font-[Lucida Sans] font-bold text-2xl text-[#6d91e8] mt-3">Statistics</h3>

                <div className="mt-4 ml-4 text-left font-[Lucida Sans]">
                    <div className = "flex justify-between mr-4">
                        <p className="text-[#ff6384]">Total Debt: </p> {/*Change to calculate total*/}
                        <p className="text-[#ff6384]"> ${parsedData.User.InitialDebt}</p>
                    </div>
                    
                    <div className = "flex justify-between mr-4">
                        <p className="text-[#36eba6]">Total savings: </p> {/*Change to calculate total*/}
                        <p className="text-[#36eba6]"> ${parsedData.User.InitialAmount}</p>
                    </div>

                    <div className = "flex justify-between mr-4">
                        <p style = {{color: (parsedData.User.InitialAmount/parsedData.User.InitialDebt >= 1) ? '#36eba6' :'#ff6384'}}>Assets to Liabilities Ratio: </p>
                        <p style = {{color: (parsedData.User.InitialAmount/parsedData.User.InitialDebt >= 1) ? '#36eba6' :'#ff6384'}}>{parsedData.User.InitialAmount/parsedData.User.InitialDebt >= 1? parsedData.User.InitialAmount/parsedData.User.InitialDebt +':1' : 1 + ':' + 1/(parsedData.User.InitialAmount/parsedData.User.InitialDebt)}</p>
                    </div>

                    <div className = "flex justify-between mr-4">
                        <p>Spending this month:</p>
                        <p></p>
                    </div>

                    <div className = "flex justify-between mr-4">
                        <p>% spending on essentials: </p>
                        <p></p>
                    </div>

                    <div className = "flex justify-between mr-4">
                        <p>Need more ideas for this: </p>
                        <p></p>
                    </div>
                </div>
            </div>
        </div>

        {/* Fix Scaling Here!! */}
        <div className="flex justify-between w-[85vw] mt-[8vh]">
            <div className= "flex-col justify-between ml-8 w-[50vh] h-[60vh] border border-[#6d91e8] rounded-[2%] text-center bg-[rgba(17,18,23,.9)]">
                <h3 className="font-[Lucida Sans] font-bold text-2xl text-[#6d91e8] mt-3">Recent Expenses</h3>
                <div className="mt-3 h-[50vh] w-[100%] rounded-lg overflow-y-scroll grow min-h-0">
                    <ExpensesList items={expenses} renderer={renderExpenseItem} />
                </div>
            </div>

            <div className= "ml-8 w-[50vw] min-h-fit h-[40vh] border border-[#6d91e8] rounded-lg text-center bg-white/90">
                <h3 className="font-[Lucida Sans] font-bold text-2xl text-[#6d91e8] mt-3">Total Expenses by Month</h3>
                <ExpensesLineChart />
            </div>
        </div>

        <div className="w-[10vw] min-h-fit h-[90vh] border border-[#6d91e8] rounded-lg text-center bg-[rgba(17,18,23,.9)] fixed top-[8vh] right-8">
            <h3 className="font-[Lucida Sans] font-bold text-2xl text-[#6d91e8] mt-3">Depth</h3>
            <p className="mt-10 m-2">(replace this with a graphic designed depth meter)</p>
        </div>

        <div className="flex justify-between w-[85vw] mt-[8vh]">
            <div className= "ml-8 w-[50vh] min-h-fit h-[50vh] border border-[#6d91e8] rounded-[2%] text-center bg-[rgba(17,18,23,.9)]">
                <h3 className="font-[Lucida Sans] font-bold text-2xl text-[#6d91e8] mt-3">Recent Income</h3>
            </div>

            <div className= "ml-8 w-[50vw] min-h-fit h-[40vh] border border-[#6d91e8] rounded-lg text-center bg-white/90">
                <h3 className="font-[Lucida Sans] font-bold text-2xl text-[#6d91e8] mt-3">Total Income by Month</h3>
                <IncomeLineChart />
            </div>
        </div>
        

        <div className="flex justify-between w-[85vw] mt-[8vh]">
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