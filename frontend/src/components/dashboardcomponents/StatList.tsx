var totalDebt = 0, totalMinPayments = 0;
var totalIncome = 0, totalExpenses = 0;

function calcDebt(parsedData:any)
{
    totalDebt = 0;
    totalMinPayments = 0;
    const today = new Date();
    console.log(parsedData.User.Debts.length);
    for (var i = 0; i < parsedData.User.Debts.length; i++) 
    {
        var counter = parsedData.User.Debts[i];

        // Ensures item is not in the future
        if(counter.InitialTime != undefined)
        {
            let old = new Date(Date.UTC(counter.InitialTime.Year, counter.InitialTime.Month - 1, counter.InitialTime.Day));
            if((today.getTime() - old.getTime()) < 0)
                continue;
        }

        totalDebt += counter.Amount;
        console.log(counter.Amount);
        totalMinPayments += counter.Monthly;
    }
}

function calcIncome(parsedData:any)
{
    totalIncome = 0;
    const today = new Date();

    for (var i = 0; i < parsedData.User.Income.length; i++) 
    {
        var counter = parsedData.User.Income[i];

        // Ensures item is not in the future
        if(counter.InitialTime != undefined)
        {
            let old = new Date(Date.UTC(counter.InitialTime.Year, counter.InitialTime.Month - 1, counter.InitialTime.Day));
            if((today.getTime() - old.getTime()) < 0)
                continue;

            if(today.getMonth() + 1 != counter.InitialTime.Month)
                continue;
        }

        totalIncome += counter.Amount;
    }
}

function calcExpenses(parsedData:any)
{
    totalExpenses = 0;
    const today = new Date();

    for (var i = 0; i < parsedData.User.Expenses.length; i++) 
    {
        var counter = parsedData.User.Expenses[i];

        // Ensures item is not in the future
        if(counter.InitialTime != undefined)
        {
            let old = new Date(Date.UTC(counter.InitialTime.Year, counter.InitialTime.Month - 1, counter.InitialTime.Day));
            if((today.getTime() - old.getTime()) < 0)
                continue;

            if(today.getMonth() + 1 != counter.InitialTime.Month)
                continue;
        }

        totalExpenses += counter.Amount;
    }
}

function StatList() 
{
    var data = localStorage.getItem('user_data');
    var parsedData = data ? JSON.parse(data) : null;

    calcDebt(parsedData);
    calcIncome(parsedData);
    calcExpenses(parsedData);

    return (
        <ul className="shadow divide-y divide-[#7f8fb5] min-h-0 border-b border-[#6d91e8]">

            <li className="px-[1vw] py-[1vh]">
                <div>
                    <div className="flex justify-between items-center">
                        <span className="text-white font-semibold text-md">Total Savings:</span>
                        {/*Change below to calculate actual savings once set up in database*/}
                        <span className="font-semibold text-md" style = {{color: (parsedData.User.InitialAmount != 0) ? '#36eba6' :'#ff6384'}}> ${parsedData.User.InitialAmount.toFixed(2)}</span>
                    </div>
                </div>
                <p>(~{Math.floor((500/parsedData.User.InitialAmount) * 100)}% of your savings on signup.)</p>
            </li>
            <li className="px-[1vw] py-[1vh]">
                <div>
                    <div className="flex justify-between items-center">
                        <span className="text-white font-semibold text-md">Total Debt:</span>
                        <span className="font-semibold text-md" style = {{color: (totalDebt == 0) ? '#36eba6' :'#ff6384'}}> ${totalDebt.toFixed(2)}</span>
                    </div>
                    <p>(~{Math.floor((totalDebt/parsedData.User.InitialDebt) * 100)}% of your debt on signup.)</p>
                </div>
            </li>

            <li className="px-[1vw] py-[1vh]">
                <div>
                    <div className="flex justify-between items-center">
                        <span className="text-white font-semibold text-md">Assets to Liabilities Ratio:</span>
                        <p className="font-semibold text-md" style = {{color: (parsedData.User.InitialAmount/parsedData.User.InitialDebt >= 1) ? '#36eba6' :'#ff6384'}}>{parsedData.User.InitialAmount/parsedData.User.InitialDebt >= 1? parsedData.User.InitialAmount/parsedData.User.InitialDebt +':1' : 1 + ':' + 1/(parsedData.User.InitialAmount/parsedData.User.InitialDebt)}</p>
                    </div>
                </div>
            </li>

            <li className="px-[1vw] py-[1vh]">
                <div>
                    <div className="flex justify-between items-center">
                        <span className="text-white font-semibold text-md">Income this Month:</span>
                        <span className="font-semibold text-md" style = {{color: (totalIncome != 0) ? '#36eba6' :'#ff6384'}}> ${totalIncome.toFixed(2)}</span>
                    </div>
                </div>
            </li>

            <li className="px-[1vw] py-[1vh]">
                <div>
                    <div className="flex justify-between items-center">
                        <span className="text-white font-semibold text-md">Expenses this Month:</span>
                        <span className="font-semibold text-md" style = {{color: (totalExpenses <= totalIncome) ? '#36eba6' :'#ff6384'}}> ${totalExpenses.toFixed(2)}</span>
                    </div>
                    <p>(~{Math.floor((totalExpenses/totalIncome) * 100)}% of your income this month.)</p>
                </div>
            </li>
            
            <li className="px-[1vw] py-[1vh]">
                <div>
                    <div className="flex justify-between items-center">
                        <span className="text-white font-semibold text-md">Total Min Payments / Mo:</span>
                        <span className="font-semibold text-md" style = {{color: (totalMinPayments == 0) ? '#36eba6' :'#ff6384'}}> ${totalMinPayments.toFixed(2)}</span>
                    </div>
                    <p>(~{Math.floor((totalMinPayments/totalIncome) * 100)}% of your income this month.)</p>
                </div>
            </li>
        </ul>
    );
}

export default StatList;