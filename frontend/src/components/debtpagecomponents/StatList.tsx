var totalDebt = 0, totalMinPayments = 0;
var totalIncome = 0, totalExpenses = 0;

function calcDebt(parsedData:any)
{
    totalDebt = 0;
    totalMinPayments = 0;

    if(parsedData.User.Debts == undefined || parsedData.User.Debts.length == 0) 
        return;

    const today = new Date();

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
        totalMinPayments += counter.Monthly;
    }
}

function calcIncome(parsedData:any)
{
    totalIncome = 0;

    if(parsedData.User.Income == undefined || parsedData.User.Income.length == 0) 
        return;

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

    if(parsedData.User.Expenses == undefined || parsedData.User.Expenses.length == 0) 
        return;

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
            <li className="px-[1vw] py-[1vh] group hover:bg-white/10">
                <div>
                    <div className="flex justify-between items-center">
                        <span className="text-white font-semibold text-3xl">Total Debt:</span>
                        <span className="font-semibold text-3xl" style = {{color: (totalDebt == 0) ? '#36eba6' :'#ff6384'}}> ${totalDebt.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                    </div>
                    <p className="max-h-0 overflow-hidden opacity-0 group-hover:opacity-100 group-hover:max-h-16 transition-all duration-300 ease-out visibility-hidden group-hover:visibility-visible">{parsedData.User.InitialDebt != 0 ? "~"+Math.floor((totalDebt/parsedData.User.InitialDebt) * 100) : "N/A"}% of your debt on signup.</p>
                </div>
            </li>

            <li className="px-[1vw] py-[1vh] group hover:bg-white/10">
                <div>
                    <div className="flex justify-between items-center">
                        <span className="text-white font-semibold text-md">Number of Debts:</span>
                        <span className="font-semibold text-md" style = {{color: (totalMinPayments == 0) ? '#36eba6' :'#ff6384'}}>{parsedData.User.Debts.length}</span>
                    </div>
                    <p className="max-h-0 overflow-hidden opacity-0 group-hover:opacity-100 group-hover:max-h-16 transition-all duration-300 ease-out visibility-hidden group-hover:visibility-visible">{totalIncome > 0 ? "~" + Math.floor((totalMinPayments/totalIncome) * 100) : "N/A"}% of your income this month.</p>
                </div>
            </li>

            <li className="px-[1vw] py-[1vh] group hover:bg-white/10">
                <div>
                    <div className="flex justify-between items-center">
                        <span className="text-white font-semibold text-md">Assets to Liabilities Ratio:</span>
                        <p className="font-semibold text-md" style = {{color: (parsedData.User.InitialAmount/totalDebt >= 1) ? '#36eba6' :'#ff6384'}}>{totalDebt != 0 ? parsedData.User.InitialAmount/totalDebt >= 1? parsedData.User.InitialAmount/totalDebt +':1' : 1 + ':' + 1/(parsedData.User.InitialAmount/totalDebt) : "N/A"}</p>
                    </div>
                </div>
                <p className="max-h-0 overflow-hidden opacity-0 group-hover:opacity-100 group-hover:max-h-16 transition-all duration-300 ease-out visibility-hidden group-hover:visibility-visible">Experts recommend between 3:1 and 5:1.</p>
            </li>
            
            <li className="px-[1vw] py-[1vh] group hover:bg-white/10">
                <div>
                    <div className="flex justify-between items-center">
                        <span className="text-white font-semibold text-md">Debt Payments this Month:</span>
                        <span className="font-semibold text-md" style = {{color: (totalMinPayments == 0) ? '#ff6384' : '#36eba6'}}> ${totalMinPayments.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                    </div>
                    <p className="max-h-0 overflow-hidden opacity-0 group-hover:opacity-100 group-hover:max-h-16 transition-all duration-300 ease-out visibility-hidden group-hover:visibility-visible">{totalIncome > 0 ? "~" + Math.floor((totalMinPayments/totalIncome) * 100) : "N/A"}% of your income this month.</p>
                </div>
            </li>

            <li className="px-[1vw] py-[1vh] group hover:bg-white/10">
                <div>
                    <div className="flex justify-between items-center">
                        <span className="text-white font-semibold text-md">Average Interest Rate:</span>
                        <span className="font-semibold text-md" style = {{color: (totalMinPayments == 0) ? '#36eba6' :'#ff6384'}}> 15%</span>
                    </div>
                    <p className="max-h-0 overflow-hidden opacity-0 group-hover:opacity-100 group-hover:max-h-16 transition-all duration-300 ease-out visibility-hidden group-hover:visibility-visible">{totalIncome > 0 ? "~" + Math.floor((totalMinPayments/totalIncome) * 100) : "N/A"}% of your income this month.</p>
                </div>
            </li>

            <li className="px-[1vw] py-[1vh] group hover:bg-white/10">
                <div>
                    <div className="flex justify-between items-center">
                        <span className="text-white font-semibold text-md">Debt Payments this Month:</span>
                        <span className="font-semibold text-md" style = {{color: (totalMinPayments == 0) ? '#36eba6' :'#ff6384'}}> ${totalMinPayments.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                    </div>
                    <p className="max-h-0 overflow-hidden opacity-0 group-hover:opacity-100 group-hover:max-h-16 transition-all duration-300 ease-out visibility-hidden group-hover:visibility-visible">{totalIncome > 0 ? "~" + Math.floor((totalMinPayments/totalIncome) * 100) : "N/A"}% of your income this month.</p>
                </div>
            </li>
            
        </ul>
    );
}

export default StatList;