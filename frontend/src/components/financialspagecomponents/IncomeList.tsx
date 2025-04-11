import * as React from "react";
import {useState} from "react";

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

interface ChildProps 
{
    triggerRerender: () => void;
}


const IncomeList: React.FC<ChildProps> = ({ triggerRerender }) =>
{
    var data = localStorage.getItem('user_data');
    var parsedData = data ? JSON.parse(data) : null;

    console.log("After addition the array is of size " + parsedData.User.Income.length);


    const [editingItem, setEditingItem] = useState<Item | null>(null);
    const [deletingItem, setDeletingItem] = useState<Item | null>(null);

    const handleEditClick = (item: Item) => 
    {
        setDeletingItem(null);
        setEditingItem(item);
    };

    const handleDeleteClick = (item: Item) => 
    {
        setEditingItem(null);
        setDeletingItem(item);
    };

    const handleCancel = () => 
    {
        setEditingItem(null);
        setDeletingItem(null);
    };

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
        console.log(item);
        var months = [ "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December" ];

        let old = new Date(Date.UTC(item.Date.Year, item.Date.Month - 1, item.Date.Day));
        let daysago = Math.floor((today.getTime() - old.getTime()) / 86400000);

        return (
            <div>
                <div className="flex justify-between items-center">
                    <span className="text-white font-semibold text-md">${item.Amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    <span className="text-gray-300 text-xs"> {daysago == 0 ? "Today" : 
                    daysago > 30 ? months[item.Date.Month - 1] + " " + item.Date.Day + GetDaySuffix(item.Date.Day): daysago + " Days Ago"}</span>
                    
                </div>
                <div className="flex justify-between items-center my-[1vh]">
                    <p className="text-white">{item.Name}</p>
                    <span>
                        <button className = "relative right-[20%] rounded-sm inline-block h-fit w-fit p-[10px] pt-[5px] pb-[7px] bg-transparent border border-[#6d91e8] text-center text-[1.8vh] hover:bg-blue-400/15 hover:border-[#bdc8e2] cursor-pointer" onClick = {()=> handleEditClick(item)}>Edit </button>
                        <button className = "rounded-sm inline-block h-fit w-fit p-[10px] pt-[5px] pb-[7px] bg-transparent border border-[#6d91e8] text-center text-[1.8vh] hover:bg-blue-400/15 hover:border-[#bdc8e2]" onClick = {()=> handleDeleteClick(item)}>Delete</button>
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


    async function deleteIncome(item: Item) : Promise<void>
    {
        var data = localStorage.getItem('user_data');
        var parsedData = data ? JSON.parse(data) : null;
        console.log(parsedData);
        const token = localStorage.getItem('token');

        var index = 0;
        index = parseInt(item.key);
        
        console.log("The index you are deleting is " + index);

        var obj = {index: index};
        var js = JSON.stringify(obj);
        
        try 
        {
            const response = await fetch('http://salvagefinancial.xyz:5000/api/DeleteIncome',
            {method:'POST',body:js,headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${token}`}});
            var res = JSON.parse(await response.text());

            if (res.Result == "Deleted income from user") 
            {
                await setInfo();
                console.log("Deleted " + index);
                triggerRerender();
                handleCancel();
                return;
            } 
            else if (res.Result == "Could not find user to delete income")
            {
                console.log(res.Result);
                return;
            } 
            else if (res.Result == "Could not delete income")
            {
                console.log(res.Result);
                return;
            }
        } 
        catch (error: any)
        {
            alert(error.toString());
            return;
        }

    }

    async function editIncome(item: Item, date: string, isRecurring: boolean | null) 
    {
        const token = localStorage.getItem('token');
        var index = parseInt(item.key);
        
        const [month, day, year] = date.split("/");
        const NewInitialTime = {Month: month, Day: day, Year: year};

        var obj = {
            index: index,
            NewName: item.Name, // Already updated in EditModal state
            NewAmount: item.Amount, // Already updated in EditModal state
            NewIfRecurring: isRecurring,
            NewInitialTime: NewInitialTime
       };

        var js = JSON.stringify(obj);

        try {

            const response = await fetch('http://salvagefinancial.xyz:5000/api/EditIncome',
            {method:'POST',body:js,headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${token}`}});
            var res = JSON.parse(await response.text());
            

            if (res.Result == "Edited income of user") 
            {
                console.log("edited\n");
                await setInfo();
                triggerRerender(); // Ensure parent knows data changed
                handleCancel(); // Close modal
            } else if (res.Result == "Could not find user to edit income"){
                console.log(res.Result);
                return;
            } else if (res.Result == "Could not edit income"){
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
     
    var props: PropsType = 
    {
        items: setIncome(),
        renderer: renderExpenseItem
    };

    console.log(props.items.length);

    if(parsedData.User.Income == undefined  || parsedData.User.Income.length == 0)
    {
        return(
            <div id = "results">
                <div className="flex h-[10%] items-center justify-center border-b border-[#6d91e8]">
                    <span id = "visualTitle" className = "font-[Lucida Sans] font-bold text-[3vh] text-[#ffffff]"> Your Income</span>
                </div>

                <div className="text-white p-5">
                    <p className="mt-5">Looks like you need to get your money up.</p>
                    <p className="mt-5">Jobless much? 🤨</p>
                </div>
            </div>
        );
    }

    return(
        <div id = "results" className="flex flex-col h-full">

            <div className="flex h-[10%] items-center justify-center border-b border-[#6d91e8]">
                <span id = "visualTitle" className = "font-[Lucida Sans] font-bold text-[3vh] text-[#ffffff]"> Your Income</span>
            </div>

            
            {!editingItem && !deletingItem && (
                <div className = "flex flex-col flex-grow min-h-0">
                    <ul className="flex-grow overflow-y-auto shadow divide-y divide-[#7f8fb5] border-b border-[#6d91e8] px-4 py-2" id = "list">
                        {props.items.map((item) => {
                        return <li key={item.key} className="px-[1vw] py-[1vh] hover:bg-white/5">{props.renderer(item)}</li>;
                        })}
                    </ul>
                </div>
             )}

            {/* Edit Modal */}
            {editingItem && (
                <EditModal
                    item={editingItem}
                    onSave={editIncome}
                    onCancel={handleCancel}
                />
            )}

            {/* Delete Modal */}
            {deletingItem && (
               <DeleteModal
                   item={deletingItem}
                   onConfirm={deleteIncome}
                   onCancel={handleCancel}
               />
            )}
        </div>
    );
}

// Modal components
interface ModalProps 
{
    item: Item;
    onCancel: () => void;
}

interface EditModalProps extends ModalProps 
{
     onSave: (item: Item, dateStr: string, isRecurring: boolean | null) => Promise<void>;
}

interface DeleteModalProps extends ModalProps 
{
    onConfirm: (item: Item) => Promise<void>;
}

const EditModal: React.FC<EditModalProps> = ({ item, onSave, onCancel }) => 
{
    // Use state for form inputs
    const [name, setName] = useState(item.Name);
    
    // Ensure amount is treated as string for input, handle potential non-numeric original value
    const [amount, setAmount] = useState(typeof item.Amount === 'number' ? item.Amount.toString() : '');
    
    // Ensure date components are valid before creating string
    const dateStr = !isNaN(item.Date.Month) && !isNaN(item.Date.Day) && !isNaN(item.Date.Year)
       ? `${item.Date.Month}/${item.Date.Day}/${item.Date.Year}`
       : '';

    const [date, setDate] = useState(dateStr);
    const [isRecurring, setIsRecurring] = useState<boolean | null>(null);

    const handleSaveClick = () => {
        if (isRecurring === null) 
        {
            alert("Please select if the income is recurring."); // CHange all these alerts to standard error message
            return;
        }

        // Validate inputs (e.g., date format, amount is number) before saving
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount)) 
        {
            alert("Please enter a valid amount.");
            return;
        }

        // Basic date format check (MM/DD/YYYY)
        if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date)) 
        {
            alert("Please enter the date in MM/DD/YYYY format.");
            return;
        }

        // Create an updated item object to pass to the save function
        const updatedItem: Item = 
        {
            ...item, 
            Name: name,
            Amount: parsedAmount
        };

        onSave(updatedItem, date, isRecurring);
    };

    return (
        <div>
            <h5 className="self-start ml-[10%] text-lg text-left text-[0.95rem]">Name</h5>
            <input className="h-6 w-8/10 text-lg rounded-sm border border-[#6d91e8] bg-blue-400/5 focus:outline-none p-1" value={name} onChange={(e) => setName(e.target.value)} placeholder = {item.Name} id = "Expname"/>
    
            <h5 className="self-start ml-[10%] text-lg text-left text-[0.95rem]">Amount</h5>
            <input type="number" className="h-6 w-8/10 text-lg rounded-sm border border-[#6d91e8] bg-blue-400/5 focus:outline-none p-1" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder = {typeof item.Amount === 'number' ? item.Amount.toString() : 'Amount'} id = "Expnum"/>
    
            <h5 className="self-start ml-[10%] text-lg text-left text-[0.95rem]">Date</h5>
            <input className="h-6 w-8/10 text-lg rounded-sm border border-[#6d91e8] bg-blue-400/5 focus:outline-none p-1" value={date} onChange={(e) => setDate(e.target.value)} placeholder = {dateStr || 'MM/DD/YYYY'} id = "expdate"/>

            <div className="flex items-center justify-between ml-[10%] mt-2 w-8/10">
                <h5 className="self-start text-lg text-left text-[0.95rem]">Is The Income Recurring?</h5>  
                <div>
                    <label>
                        <input type="radio" name="radios" checked={isRecurring === true} onChange={() => setIsRecurring(true)}></input>
                    Yes </label>
                            
        
                    <label>
                        <input type="radio" name="radios" checked={isRecurring === false} onChange={() => setIsRecurring(false)}></input>
                    No </label>  
                </div>
            </div>
    
    
            <button id = "EditIncome" className = "fixed left-[29%] top-[87%] rounded-sm inline-block h-fit w-fit p-[10px] pt-[5px] pb-[7px] bg-transparent border border-[#6d91e8] text-center text-[1.8vh] hover:bg-blue-400/15 hover:border-[#bdc8e2]" onClick ={handleSaveClick}>Edit Income</button>
            <button className = "fixed right-[31%] top-[87%] rounded-sm inline-block h-fit w-fit p-[10px] pt-[5px] pb-[7px] bg-transparent border border-[#6d91e8] text-center text-[1.8vh] hover:bg-blue-400/15 hover:border-[#bdc8e2]" onClick ={onCancel}> Cancel</button>
        </div>
    );
};


const DeleteModal: React.FC<DeleteModalProps> = ({ item, onConfirm, onCancel }) => 
{
    // Ensure date components are valid before creating string
    const date = !isNaN(item.Date.Month) && !isNaN(item.Date.Day) && !isNaN(item.Date.Year)
       ? `${item.Date.Month}/${item.Date.Day}/${item.Date.Year}`
       : 'N/A'; // Fallback display

     // Ensure Amount is a number before displaying
    const amount = typeof item.Amount === 'number' ? item.Amount : 'N/A';

    return (
        <div className="flex flex-col">
            <div className="flex-col mt-2 h-[10%] items-center justify-center">
                <span id = "visualTitle" className = "font-[Lucida Sans] font-bold text-[2.5vh] text-[#ffffff]"> Do you want to delete this Income?</span>
            </div>
            
            <h5 className="text-lg text-center mt-10">Name:  {item.Name}</h5>

                        
            <h5 className="text-lg text-center">Amount: {amount}</h5>

            <h5 className="text-lg text-center">Date: {date}</h5>
            
            <div className="fixed top-[80%] left-3/10  w-4/10 flex items-center justify-center">
                <button className = "mr-2 rounded-sm inline-block h-fit w-fit p-[10px] pt-[5px] pb-[7px] bg-transparent border border-[#ff6384] text-center text-[1.8vh] hover:bg-red-400/50 hover:border-[#fc3030]" onClick = {() => onConfirm(item)}> Delete</button>
                <button className = "ml-2 rounded-sm inline-block h-fit w-fit p-[10px] pt-[5px] pb-[7px] bg-transparent border border-[#6d91e8] text-center text-[1.8vh] hover:bg-blue-400/15 hover:border-[#bdc8e2]" onClick = {onCancel}> Cancel</button>
            </div>
        </div>
    );
};


export default IncomeList;