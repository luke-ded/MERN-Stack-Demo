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

    function addExpense(){
        const valAmount = (document.getElementById("ExpNum") as HTMLInputElement).value;
        const alertMessage = document.getElementById("alertMessage");
        console.log(isRecurring);

        if (alertMessage) {
            if (valAmount.length == 0 && isButtonClicked == true){
                alertMessage.innerText = "No amount is entered";
                alertMessage.style.visibility = "visible";
                return;
            } else if (isButtonClicked == false && valAmount.length != 0){
                alertMessage.innerText = "Please check the box";
                alertMessage.style.visibility = "visible";
                return;
            } else if (isButtonClicked == false && valAmount.length == 0) {
                alertMessage.innerText = "No Input detected";
                alertMessage.style.visibility = "visible";
                return;
            } else {
                alertMessage.style.visibility = "hidden";
                return;
            }
        } 
    }
    

    return(
        <div id = "visual">
            
            <span id = "visualTitle" className = "font-[Lucida Sans] font-bold text-[3vh] text-[#ffffff]"> Expenses</span>

            <br></br>
            <br></br>

            <h5 className="self-start ml-[10%] text-lg text-left">Amount</h5>
            <input className="w-8/10 text-lg rounded-sm border border-[#6d91e8] bg-blue-400/5 focus:outline-none p-1" type="text" placeholder = "Amount" id = "ExpNum"></input>

            <br></br>
            <br></br>

            <h5 className="self-start ml-[10%] text-lg text-left">Is The Expense Recurring?</h5>

                <br></br>

                <div className = "absolute top-[50%] left-[12%]">
                    <label>
                        <input type="radio" name="radio" onClick = {setYes}></input>
                    Yes </label>
                    

                    <label>
                        <input type="radio" name="radio" onClick = {setNo}></input>
                    No </label>  
                </div>

                <h5 className="mt-3" id="alertMessage"></h5>

                <button id = "ExpenseAdd" className = "rounded-sm inline-block absolute top-[80%] left-[40%] h-fit w-fit p-[10px] pt-[5px] pb-[7px] bg-transparent border border-[#6d91e8] text-center text-[1.8vh] hover:bg-blue-400/15 hover:border-[#bdc8e2]" onClick = {addExpense}>Add Expense</button>
        </div>
    );
}

export default VisualFinances;