import * as React from "react";


interface Item 
{
    key:string;
    Name: string;
    Date: any;
    Amount: any,
}

interface PropsType 
{
    items: Item[];
    renderer: (item: Item) => React.ReactNode;
}

function setIncome()
{
    const today = new Date();

    var data = localStorage.getItem('user_data');
    var parsedData = data ? JSON.parse(data) : null;

    let expenses = new Array<Item>();

    for (var i = 0; i < parsedData.User.Income.length; i++) 
    {
        var counter = parsedData.User.Income[i];

        // Ensures item is not in the future
        if(counter.InitialTime != undefined)
        {
            let old = new Date(Date.UTC(counter.InitialTime.Year, counter.InitialTime.Month - 1, counter.InitialTime.Day));
            if((today.getTime() - old.getTime()) < 0)
                continue;
        }

        let newItem: Item = {
            key: i.toString(),
            Name: counter.Name, 
            Date: counter.InitialTime != undefined ? counter.InitialTime : {"Month":1, "Day":1, "Year":2023},
            Amount: counter.Amount
        };

        expenses.push(newItem);
    }
    
    expenses.sort((a, b) => Date.UTC(b.Date.Year, b.Date.Month - 1, b.Date.Day) 
    - Date.UTC(a.Date.Year, a.Date.Month - 1, a.Date.Day));

    return expenses.slice(0, 20); // Return most recent 10 items
}

const renderExpenseItem = (item: Item): React.ReactNode => 
{
    const today = new Date();

    var months = [ "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December" ];

    let old = new Date(Date.UTC(item.Date.Year, item.Date.Month - 1, item.Date.Day));
    let daysago = Math.floor((today.getTime() - old.getTime()) / 86400000);

    return (
        <div>
            <div className="flex justify-between items-center">
                <span className="text-white font-semibold text-md">${item.Amount}</span>
                <span className="text-gray-300 text-xs"> {daysago == 0 ? "Today" : 
                daysago > 30 ? months[item.Date.Month - 1] + " " + item.Date.Day + GetDaySuffix(item.Date.Day): daysago + " Days Ago"}</span>
                <span>
                    <button className = "relative right-[20%] rounded-sm inline-block h-fit w-fit p-[10px] pt-[5px] pb-[7px] bg-transparent border border-[#6d91e8] text-center text-[1.8vh] hover:bg-blue-400/15 hover:border-[#bdc8e2]">Edit </button>
                    <button className = "rounded-sm inline-block h-fit w-fit p-[10px] pt-[5px] pb-[7px] bg-transparent border border-[#6d91e8] text-center text-[1.8vh] hover:bg-blue-400/15 hover:border-[#bdc8e2]" onClick = {deleteIncome}>Delete</button>
                </span>
            </div>
            <p className="self-start text-white">{item.Name}</p>
        </div>
    );
};

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


function deleteIncome(){

    
}

function Results(){

     
    var props: PropsType = {
        items: setIncome(),
        renderer: renderExpenseItem
    };
    
    
    
    return(
        <div id = "results">

            <div className="flex h-[10%] items-center justify-center border-b border-[#6d91e8]">

                <span id = "visualTitle" className = "font-[Lucida Sans] font-bold text-[3vh] text-[#ffffff]"> Your Income</span>

            </div>

            
            <div className = "rounded-lg grow min-h-0">
                <ul className="flex-none overflow-y-scroll shadow divide-y divide-[#7f8fb5] border-b border-[#6d91e8] px-4 py-2 h-[350px]"> 
                    {props.items.map((item) => {
                    return <li className="px-[1vw] py-[1vh] cursor-pointer">{props.renderer(item)}</li>;
                    })}
                </ul>
            </div>

                
           

        </div>
    );
}


export default Results;