import app from "../pages/App.module.css";
//import { useNavigate } from 'react-router-dom';
//import {useState} from 'react'


function Finances(){

    function showIncome(){
        
    }

    function addIncome(){

    }


    return(

        <div id = "finances">
            <div id = "income">
               <h2 id = "IncomeSection">Income</h2>

               <button id = "AddIncome" className ={app.addbuttons}>Add Income</button> 
            </div>
            
        </div>

    );
}


export default Finances;