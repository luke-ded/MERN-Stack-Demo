import Finances from '../components/Finances.tsx';
import NavBar from '../components/NavBar.tsx';
import VisualFinances from '../components/VisualFinances.tsx';
import app from './App.module.css';
import {useState} from 'react'

const FinancialsPage = () => {

  const [isFinanceBarClosed, setFinanceBar] = useState(false);
  const [isVisualBarClosed, setVisualBar] = useState(false);

  function closeFinanceBar(){ 
    const bar = document.getElementById("FinanceBar");
    const finances = document.getElementById("finances");
    const btn = document.getElementById(app.exitBtn);
    const alertMessage = document.getElementById("alertmessage");

    if (bar && finances && btn && alertMessage){
      alertMessage.style.visibility = "hidden";
      finances.style.visibility = "hidden";
      bar.style.backgroundColor = "rgba(0,26, 51)";
      bar.style.border = "none";
      btn.innerHTML = "&#10010;"
      setFinanceBar(true);
    }

  }

  function openFianceBar(){
    const bar = document.getElementById("FinanceBar");
    const finances = document.getElementById("finances");
    const btn = document.getElementById(app.exitBtn);

    if (bar && finances && btn){
      finances.style.visibility = "visible";
      bar.style.backgroundColor = "rgba(17,18,23, .9)";
      bar.style.border = "1.5px solid #6d91e8";
      btn.innerHTML = "&#10060;"
      setFinanceBar(false);
    }
  }


  function closeVisualBar(){

    const bar = document.getElementById("VisualBar");
    const visual = document.getElementById("visual");
    const btn = document.getElementById(app.exitBtnV);
    const alertMessage = document.getElementById("alertMessage");

    if (bar && visual && btn && alertMessage){ 
      alertMessage.style.visibility = "hidden";   
      visual.style.visibility = "hidden";
      bar.style.backgroundColor = "rgba(0,26, 51)";
      bar.style.border = "none";
      btn.innerHTML = "&#10010;"
      setVisualBar(true);
    }

  }

  function openVisualBar(){

    const bar = document.getElementById("VisualBar");
    const visual = document.getElementById("visual");
    const btn = document.getElementById(app.exitBtnV);

    if (bar && visual && btn){  
      visual.style.visibility = "visible";
      bar.style.backgroundColor = "rgba(17,18,23, .9)";
      bar.style.border = "1.5px solid #6d91e8";
      btn.innerHTML = "&#10060;"
      setVisualBar(false);
    }

  }



  return (
    <div className = "absolute top-0 left-0 h-full w-full bg-[rgba(0,26,51,1)]">
         <NavBar />

         <div className = "block absolute top-1/2 left-2/7 w-[30%] h-[40%] min-h-fit bg-[rgba(17,18,23,0.9)] border border-[#6d91e8] border-[1.5px] rounded-[2%] text-center transform -translate-x-1/2 -translate-y-1/2" id ="FinanceBar">
          <Finances />
          <button id = {app.exitBtn} onClick={() => {if(isFinanceBarClosed == false) {closeFinanceBar();} else {openFianceBar();}}}>&#10060;</button><br />
        </div>

        <div className = "block absolute top-1/2 left-[70%] w-[30%] h-[40%] min-h-fit bg-[rgba(17,18,23,0.9)] border border-[#6d91e8] border-[1.5px] rounded-[2%] text-center transform -translate-x-1/2 -translate-y-1/2" id = "VisualBar">
          <VisualFinances />
          <button id = {app.exitBtnV} onClick = {() => {if(isVisualBarClosed == false) {closeVisualBar();} else {openVisualBar();}}}>&#10060;</button><br />
        </div>
    </div>
  );
};

export default FinancialsPage;
