import * as React from "react";
import { useNavigate } from 'react-router-dom';

interface Item 
{
    key:string;
    Name: string;
    Date: any;
    Amount: any,
    APR: any;
}

interface PropsType 
{
    items: Item[];
    renderer: (item: Item) => React.ReactNode;
}


function setSavings()
{
    const today = new Date();

    var data = localStorage.getItem('user_data');
    var parsedData = data ? JSON.parse(data) : null;

    let savings = new Array<Item>();

    for (var i = 0; i < parsedData.User.Savings.length; i++) 
    {
        var counter = parsedData.User.Savings[i];

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
            Amount: counter.Amount,
            APR: counter.APR
        };

        savings.push(newItem);
    }
    
    savings.sort((a, b) => a.Amount == b.Amount ? Date.UTC(b.Date.Year, b.Date.Month - 1, b.Date.Day) 
    - Date.UTC(a.Date.Year, a.Date.Month - 1, a.Date.Day) : b.Amount - a.Amount);

    return savings.slice(0, 20); // Return most recent 10 items
}

const renderSavingsItem = (item: Item): React.ReactNode => 
{
    return (
        <div>
            <div className="flex justify-between items-center">
                <span className="text-white font-semibold text-md">${item.Amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                <span className="text-gray-300 text-xs">{item.APR.toFixed(2)}% APR</span>
            </div>
            <p className="self-start text-white">{item.Name}</p>
        </div>
    );
};


function SavingsList() 
{
    var data = localStorage.getItem('user_data');
    var parsedData = data ? JSON.parse(data) : null;

    const navigate = useNavigate();

    if(parsedData.User.Debts == undefined || parsedData.User.Debts.length == 0)
    {
        return(
            <div className="text-white m-5">
                <p className="m-2">No accounts to display.</p>
                <p className="inline">(If you haven't added your accounts yet in the </p>
                <p className="inline underline text-[#6d91e8] cursor-pointer" onClick={navSavings}>accounts pane</p>
                <p className="inline">, you should)</p>
            </div>
        );
    }

    

    var props: PropsType = {
        items: setSavings(),
        renderer: renderSavingsItem
    };

    function navSavings()
    {
        navigate('/savings');
    }

    return (
        <ul className="shadow divide-y divide-[#7f8fb5] min-h-0">
        {props.items.map((item) => {
            return <li onClick={navSavings} className="px-[1vw] py-[1vh] cursor-pointer border-b border-[#7f8fb5]">{props.renderer(item)}</li>;
        })}
        </ul>
    );
}

export default SavingsList;