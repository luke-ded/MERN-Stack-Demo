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

    if (bar && finances && btn){
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

    if (bar && visual && btn){  
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
    <div id = {app.finance}>
         <NavBar />

        <div className = {app.FinanceDiv}>
          <Finances />
          <button id = {app.exitBtn} onClick={() => {if(isFinanceBarClosed == false) {closeFinanceBar();} else {openFianceBar();}}}>&#10060;</button><br />
        </div>

        <div className = {app.visualDiv}>
          <VisualFinances />
          <button id = {app.exitBtnV} onClick = {() => {if(isVisualBarClosed == false) {closeVisualBar();} else {openVisualBar();}}}>&#10060;</button><br />
        </div>
    </div>
  );
};

export default FinancialsPage;
