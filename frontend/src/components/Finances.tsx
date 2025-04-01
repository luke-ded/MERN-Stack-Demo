import app from "../pages/App.module.css";
//import { useNavigate } from 'react-router-dom';
//import {useState} from 'react'


function Finances(){

    /*function showIncome(){
        return;
    }

    function addIncome(){
        return;
    }*/


    return(

        <div id = "finances">
            <div id = "income">
                <span id = "visualTitle" className = "font-[Lucida Sans] font-bold text-[3vh] text-[#ffffff]"> Income</span>

                <br></br>
                <br></br>

                <h5 className="self-start ml-[10%] text-lg text-left">Amount</h5>
                <input className="w-8/10 text-lg rounded-sm border border-[#6d91e8] bg-blue-400/5 focus:outline-none p-1" type="text" placeholder = "Amount" id = "IncNum"></input>

                <br></br>
                <br></br>

                <h5 className="self-start ml-[10%] text-lg text-left">Is The Income Recurring?</h5>

                <br></br>

                <div className = "absolute top-[50%] left-[12%]">
                    <label>
                        <input type="radio" name="radio" ></input>
                    Yes </label>
                    

                    <label>
                        <input type="radio" name="radio"></input>
                    No </label>  
                </div>


                <button id = "AddIncome" className = "rounded-sm inline-block absolute top-[80%] left-[40%] h-fit w-fit p-[10px] pt-[5px] pb-[7px] bg-transparent border border-[#6d91e8] text-center text-[1.8vh]" >Add Income</button>
            </div>
            
        </div>

    );
}


export default Finances;