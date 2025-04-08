import * as React from "react";
import ReactDOM from 'react-dom/client';

interface Item 
{
    key:string;
    Name: string;
    Date: any;
    Amount: any;
}

interface PropsType 
{
    items: Item[];
    renderer: (item: Item) => React.ReactNode;
}

function displayDModal(item: Item) {

    
    const container = document.getElementById("listss");
    if (!container) return;

    var date = item.Date.Month  + "/" + item.Date.Day + "/" + item.Date.Year;
    const root = ReactDOM.createRoot(container);
    root.render(
    <>

        <div>
            <div className="flex h-[10%] items-center justify-center">

                <span id = "visualTitle" className = "font-[Lucida Sans] font-bold text-[3vh] text-[#ffffff]"> Do you want to delete this Expense?</span>

            </div>

            <br></br>

            <h5 className="self-start ml-[10%] text-lg text-center">Name:  {item.Name}</h5>

            <br></br>
            
            <h5 className="self-start ml-[10%] text-lg text-center">Amount: {item.Amount}</h5>

            <br></br>

            <h5 className="self-start ml-[10%] text-lg text-center">Date: {date}</h5>


            <button className = "fixed left-[38%] top-[80%] rounded-sm inline-block h-fit w-fit p-[10px] pt-[5px] pb-[7px] bg-transparent border border-[#6d91e8] text-center text-[1.8vh] hover:bg-blue-400/15 hover:border-[#bdc8e2]" onClick = {() => {deleteExpense(item, event).then(() => {setInfo().then(() => refreshExpenseList());});}}> Confirm</button>
            <button className = "fixed right-[27%] top-[80%] rounded-sm inline-block h-fit w-fit p-[10px] pt-[5px] pb-[7px] bg-transparent border border-[#6d91e8] text-center text-[1.8vh] hover:bg-blue-400/15 hover:border-[#bdc8e2]" onClick = {refreshExpenseList}> Cancel</button>


        </div>

    </>);
}

function displayEModal(item: Item) {

    
    var date = item.Date.Month  + "/" + item.Date.Day + "/" + item.Date.Year;
    const container = document.getElementById("listss");
    if (!container) return;


    const root = ReactDOM.createRoot(container);
    root.render(
    <>

        <div>
            <div className="flex h-[10%] items-center justify-center">

                <span id = "visualTitle" className = "font-[Lucida Sans] font-bold text-[3vh] text-[#ffffff]"> Edit your Expense</span>

            </div>

           
                <h5 className="self-start ml-[10%] text-lg text-left text-[0.95rem]">Name</h5>
                <input className="h-5 w-8/10 text-lg rounded-sm border border-[#6d91e8] bg-blue-400/5 focus:outline-none p-1" type="text" placeholder = {item.Name} id = "ExpName"></input>

                 
            
                <h5 className="self-start ml-[10%] text-lg text-left text-[0.95rem]">Amount</h5>
                <input className="h-5 w-8/10 text-lg rounded-sm border border-[#6d91e8] bg-blue-400/5 focus:outline-none p-1" type="text" placeholder = {item.Amount} id = "ExpNum"></input>

               
            

                <h5 className="self-start ml-[10%] text-lg text-left text-[0.95rem]">Date</h5>
                <input className="h-5 w-8/10 text-lg rounded-sm border border-[#6d91e8] bg-blue-400/5 focus:outline-none p-1" type="text" placeholder = {date} id = "Expdate"></input>

                <h5 className="self-start ml-[10%] text-lg text-left">Is The Expense Recurring?</h5>

                

                <div className = "absolute top-[66%] right-[14%]">
                    <label>
                        <input type="radio" name="radios"></input>
                    Yes </label>
                    

                    <label>
                        <input type="radio" name="radios"></input>
                    No </label>  
                </div>

                

                <h5 className="fixed top-[71.5%] left-[3%] self-start ml-[10%] text-lg text-left text-[0.9rem]">Category</h5>
                <input className="h-5 w-8/10 text-lg rounded-sm border border-[#6d91e8] bg-blue-400/5 focus:outline-none p-1 mt-4" type="text" placeholder = "Category" id = "ExpCat"></input>


                <button id = "EditIncome" className = "fixed left-[27%] top-[87%] rounded-sm inline-block h-fit w-fit p-[10px] pt-[5px] pb-[7px] bg-transparent border border-[#6d91e8] text-center text-[1.8vh] hover:bg-blue-400/15 hover:border-[#bdc8e2]">Edit Expense</button>
                <button className = "fixed right-[31%] top-[87%] rounded-sm inline-block h-fit w-fit p-[10px] pt-[5px] pb-[7px] bg-transparent border border-[#6d91e8] text-center text-[1.8vh] hover:bg-blue-400/15 hover:border-[#bdc8e2]" onClick ={refreshExpenseList}> Cancel</button>

        </div>

    </>);

}


function refreshExpenseList() {
    const container = document.getElementById("listss");
    if (!container) return;

    

    const props: PropsType = {
        items: setExpenses(),
        renderer: renderExpenseItem
    };

    
    const listItems = props.items.map((item) => (
        <li key={item.key} className="px-[1vw] py-[1vh] cursor-pointer">
            {props.renderer(item)}
        </li>
        
    ));


    ReactDOM.createRoot(container).render(<>{listItems}</>);
   
    return;
}

function setExpenses()
{
    const today = new Date();

    var data = localStorage.getItem('user_data');
    var parsedData = data ? JSON.parse(data) : null;

    let expenses = new Array<Item>();

    for(var i = 0; i < parsedData.User.Expenses.length; i++) 
    {
        var counter = parsedData.User.Expenses[i];

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
                <span className="text-white font-semibold text-md">${item.Amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                <span className="text-gray-300 text-xs"> {daysago == 0 ? "Today" : 
                daysago > 30 ? months[item.Date.Month - 1] + " " + item.Date.Day + GetDaySuffix(item.Date.Day): daysago + " Days Ago"}</span>
            </div >

            <div className="flex justify-between items-center my-[1vh]">
                <p className="text-white">{item.Name}</p>
                <span>
                    <button className = "relative right-[20%] rounded-sm inline-block h-fit w-fit p-[10px] pt-[5px] pb-[7px] bg-transparent border border-[#6d91e8] text-center text-[1.8vh] hover:bg-blue-400/15 hover:border-[#bdc8e2] cursor-pointer" onClick = {()=> displayEModal(item)}>Edit </button>
                    <button className = "rounded-sm inline-block h-fit w-fit p-[10px] pt-[5px] pb-[7px] bg-transparent border border-[#6d91e8] text-center text-[1.8vh] hover:bg-blue-400/15 hover:border-[#bdc8e2]" onClick = {() => displayDModal(item)}>Delete</button>
                </span>
            </div>

            
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

async function deleteExpense(item: Item, event: any) : Promise<void>{

    var data = localStorage.getItem('user_data');
    var parsedData = data ? JSON.parse(data) : null;
    console.log(parsedData);
    const token = localStorage.getItem('token');

    var index = 0;
    const today = new Date();

    for (var i = 0; i < parsedData.User.Expenses.length; i++) 
    {
    
        var counter = parsedData.User.Expenses[i];

        
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


        if ((item.key === newItem.key) && (item.Name === newItem.Name) && (item.Amount === newItem.Amount)){
            break;
        } else {
            index++;
            continue;
        }

    }


    event.preventDefault();
    var obj = {index: index};
    var js = JSON.stringify(obj);
    
    try {

        const response = await fetch('http://salvagefinancial.xyz:5000/api/DeleteExpense',
        {method:'POST',body:js,headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${token}`}});
        var res = JSON.parse(await response.text());

        if (res.Result == "Deleted expense from user") {

            await setInfo();
            console.log("Deleted " + index);
            return;
        } else if (res.Result == "Could not find user to delete expense"){
            console.log(res.Result);
            return;
        } else if (res.Result == "Could not delete expense"){
            console.log(res.Result);
            return;
        }


    } catch (error: any){
        alert(error.toString());
        return;
    }

}

async function setInfo() : Promise<void>
  {
    
    console.log(localStorage.getItem('token'));
    
    try
    {
      const response = await fetch('http://salvagefinancial.xyz:5000/api/ShowAllInfo',
      {method:'POST', headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}});
      var res = JSON.parse(await response.text());
      if( res.Result == "invalid token")
      {
        console.log("FAILED IN SETINFO FUNCTION");
      }
      else
      {
        //console.log(JSON.stringify(res));
        localStorage.setItem('user_data', JSON.stringify(res));
      }
    }
    catch(error:any)
    {
        alert(error.toString());
        return;
    }
  }


function ExpResults()
{
    var data = localStorage.getItem('user_data');
    var parsedData = data ? JSON.parse(data) : null;

    if(parsedData.User.Expenses == undefined || parsedData.User.Expenses.length == 0)
    {
        return(
            <div id = "ExpRes">
                <div className="flex h-[10%] items-center justify-center border-b border-[#6d91e8]">
                    <span id = "visualTitle" className = "font-[Lucida Sans] font-bold text-[3vh] text-[#ffffff]"> Your Expenses</span>
                </div>

                <div className="text-white p-5">
                    <p className="mt-5">Looks like you haven't spent anything yet! No expenses to display.</p>
                </div>
            </div>
        );
    }
  

    var props: PropsType = {
        items: setExpenses(),
        renderer: renderExpenseItem
    };



    return(

        <div id = "ExpRes">


            <div className="flex h-[10%] items-center justify-center border-b border-[#6d91e8]">

                <span id = "visualTitle" className = "font-[Lucida Sans] font-bold text-[3vh] text-[#ffffff]"> Your Expenses</span>

            </div>

            <div className = "rounded-lg grow min-h-0">
                <ul className="flex-none overflow-y-scroll shadow divide-y divide-[#7f8fb5] border-b border-[#6d91e8] px-4 py-2 h-[300px]" id = "listss"> 
                    {props.items.map((item) => {
                    return <li className="px-[1vw] py-[1vh] hover:bg-white/5">{props.renderer(item)}</li>;
                    })}
                </ul>
            </div>

        </div>

    );
}

export default ExpResults;