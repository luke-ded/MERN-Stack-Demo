import app from "../pages/App.module.css";
//import { useNavigate } from 'react-router-dom';
//import {useState} from 'react'


function VisualFinances(){

    /*function showExpenses(){
        return;
    }

    function addExpense(){
        return;
    }*/

    return(
        <div id = "visual">
            <h2 id = "visualTitle"> Expenses</h2>

            <button id = "ExpenseAdd" className = {app.addbuttons}>Add Expense</button>
        </div>
    );
}

export default VisualFinances;