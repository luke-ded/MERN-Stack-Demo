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
        const Category =  (document.getElementById("ExpCat") as HTMLInputElement).value;
        const alertMessage = document.getElementById("alertMessage");
        

        if (alertMessage) {
            if (valAmount.length == 0){

                alertMessage.innerText = "No amount is entered";
                alertMessage.style.visibility = "visible";
                return;

            } else if (isButtonClicked == false) {

                alertMessage.innerText = "Please specify if it's recurring";
                alertMessage.style.visibility = "visible";
                return;

            } else if (Category.length == 0){

                alertMessage.innerText = "Please specify the category";
                alertMessage.style.visibility = "visible";
                return;

            } else {

                alertMessage.style.visibility = "hidden";

            }
        }

        const data = localStorage.getItem('user_data');
        const parsedData = data ? JSON.parse(data) : null;
        const token = localStorage.getItem('token');

        const FirstName = parsedData.User.FName;
        const LastName = parsedData.User.LName;
        const userName = FirstName + " " + LastName;

        const Amount = parseInt(valAmount);
        const IfRecurring = isRecurring;
        var InitialTime = JSON.stringify({Month: new Date().toLocaleString('default', { month: 'long' }), Day: new Date().getDate(), Year: new Date().getFullYear()});

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
            
                <span id = "visualTitle" className = "font-[Lucida Sans] font-bold text-[3vh] text-[#ffffff]">Add Expenses</span>

                <br></br>
                <br></br>

                <h5 className="self-start ml-[10%] text-lg text-left">Amount</h5>
                <input className="w-8/10 text-lg rounded-sm border border-[#6d91e8] bg-blue-400/5 focus:outline-none p-1" type="text" placeholder = "Amount" id = "ExpNum"></input>

                <br></br>
                <br></br>

                <h5 className="self-start ml-[10%] text-lg text-left">Is The Expense Recurring?</h5>

                <br></br>

                <div className = "absolute top-[40%] left-[12%]">
                    <label>
                        <input type="radio" name="radios" onClick = {setYes}></input>
                    Yes </label>
                    

                    <label>
                        <input type="radio" name="radios" onClick = {setNo}></input>
                    No </label>  
                </div>

                <h5 className="self-start ml-[10%] mt-[3%] text-lg text-left">Category</h5>
                <input className="w-8/10 text-lg rounded-sm border border-[#6d91e8] bg-blue-400/5 focus:outline-none p-1" type="text" placeholder = "Category" id = "ExpCat"></input>

                <h5 className="mt-3" id="alertMessage"></h5>

                <button id = "ExpenseAdd" className = "rounded-sm inline-block absolute top-[80%] left-[40%] h-fit w-fit p-[10px] pt-[5px] pb-[7px] bg-transparent border border-[#6d91e8] text-center text-[1.8vh] hover:bg-blue-400/15 hover:border-[#bdc8e2]" onClick = {addExpense}>Add Expense</button>
        </div>
    );
}

export default VisualFinances;