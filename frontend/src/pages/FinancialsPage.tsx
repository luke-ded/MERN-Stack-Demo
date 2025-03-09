import NavBar from '../components/NavBar.tsx';
import app from './App.module.css';

const FinancialsPage = () => {

  function closeFinanceBar(){ 
    
  }


  function closeVisualBar(){

  }


  return (
    <div id = {app.finance}>
         <NavBar />

        <div className = {app.FinanceDiv}>
          <Finances />
          <button id = {app.exitBtn} onClick={closeFinanceBar}>&#10060;</button><br />
        </div>

        <div className = {app.visualDiv}>
          <VisualFinances />
          <button id = {app.exitBtn} onClick={closeVisualBar}>&#10060;</button><br />
        </div>
    </div>
  );
};

export default FinancialsPage;
