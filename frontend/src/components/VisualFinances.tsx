//import app from "../pages/App.module.css";
//import { useNavigate } from 'react-router-dom';
import {useState} from 'react'


function VisualFinances(){

    const [isRecurring, setRecurring] = useState(false);
    const [isButtonClicked, setButton] = useState(false);

    function setYes(){
        setRecurring(true);
        setButton(true);
    }

    function setNo(){
        setRecurring(false);
        setButton(true);
    }

    async function addExpense(event: any): Promise<void>{
        
        const valAmount = (document.getElementById("ExpNum") as HTMLInputElement).value;
        const userName = (document.getElementById("ExpName") as HTMLInputElement).value;
        const Category =  (document.getElementById("ExpCat") as HTMLInputElement).value;
        const date = (document.getElementById("Expdate") as HTMLInputElement).value;
        const alertMessage = document.getElementById("alertMessage");
        

        if (alertMessage) {
            if (date.length == 0 || userName.length == 0 || valAmount.length == 0 || isButtonClicked == false){
                alertMessage.innerText = "Please Complete all the fields";
                alertMessage.style.visibility = "visible";
                return;
            } 
        }
       
        const token = localStorage.getItem('token');

        const Amount = parseInt(valAmount);
        const IfRecurring = isRecurring;
        
        const [month, day, year] = date.split("/");
        const InitialTime = {Month: parseInt(month), Day: parseInt(day), Year: parseInt(year)};


        event.preventDefault();
        var obj = {Name: userName, Amount: Amount, Category: Category ,IfRecurring: IfRecurring, InitialTime: InitialTime};
        var js = JSON.stringify(obj);

        try {

            const response = await fetch('http://salvagefinancial.xyz:5000/api/AddExpense',
            {method:'POST',body:js,headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${token}`}});
            var res = JSON.parse(await response.text());
            
            if (res.Result == "Could not add expense"){
                
                if (alertMessage){
                    alertMessage.innerText = "Unsuccesfully Added";
                    alertMessage.style.visibility = "visible";
                }

            } else if (res.Result == "Could not find user to add expense"){
                
                if (alertMessage) {
                    alertMessage.innerText = "Unsuccesfully Added";
                    alertMessage.style.visibility = "visible";
                }

            } else if (res.Result == "Added expense to user"){

                
                if (alertMessage){
                    alertMessage.innerText = "Succesfully Added";
                    alertMessage.style.visibility = "visible";
                }

            } else {

                if (alertMessage) {
                    alertMessage.innerText = "Unsuccesfully Added";
                    alertMessage.style.visibility = "visible";
                }

            }


        } catch(error: any) {

            alert(error.toString());
            return;

        }
    }
    

    return(
        <div id = "visual">
            
                <div className="flex h-[10%] items-center justify-center border-b border-[#6d91e8]">
                    <span id = "visualTitle" className = "font-[Lucida Sans] font-bold text-[3vh] text-[#ffffff]">Add Expenses</span>
                </div>

                <h5 className="self-start ml-[10%] text-lg text-left text-[0.95rem]">Name</h5>
                <input className="h-1/2 w-8/10 text-lg rounded-sm border border-[#6d91e8] bg-blue-400/5 focus:outline-none p-1" type="text" placeholder = "Name" id = "ExpName"></input>

                 <br></br>
            
                <h5 className="self-start ml-[10%] text-lg text-left text-[0.95rem]">Amount</h5>
                <input className="h-1/2 w-8/10 text-lg rounded-sm border border-[#6d91e8] bg-blue-400/5 focus:outline-none p-1" type="text" placeholder = "Amount" id = "ExpNum"></input>

                <br></br>
            

                <h5 className="self-start ml-[10%] text-lg text-left text-[0.95rem]">Date</h5>
                <input className="h-1/2 w-8/10 text-lg rounded-sm border border-[#6d91e8] bg-blue-400/5 focus:outline-none p-1" type="text" placeholder = "MM/DD/YYYY" id = "Expdate"></input>

                <h5 className="self-start ml-[10%] text-lg text-left">Is The Expense Recurring?</h5>

                <br></br>

                <div className = "absolute top-[55%] left-[10%]">
                    <label>
                        <input type="radio" name="radios" onClick = {setYes}></input>
                    Yes </label>
                    

                    <label>
                        <input type="radio" name="radios" onClick = {setNo}></input>
                    No </label>  
                </div>

                <h5 className="self-start ml-[10%] text-lg text-left text-[0.95rem]">Category</h5>
                <input className="h-1/2 w-8/10 text-lg rounded-sm border border-[#6d91e8] bg-blue-400/5 focus:outline-none p-1" type="text" placeholder = "Category" id = "ExpCat"></input>

                <h5 className="mt-3" id="alertMessage"></h5>

                <button id = "ExpenseAdd" className = "rounded-sm inline-block absolute top-[85%] left-[40%] h-fit w-fit p-[10px] pt-[5px] pb-[7px] bg-transparent border border-[#6d91e8] text-center text-[1.8vh] hover:bg-blue-400/15 hover:border-[#bdc8e2]" onClick = {addExpense}>Add Expense</button>
                
        </div>
    );
}

export default VisualFinances;