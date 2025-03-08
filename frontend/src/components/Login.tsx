import app from "../pages/App.module.css";
import { useNavigate } from 'react-router-dom';

function Login(){
  const navigate = useNavigate();

  function doLogin()
  {
    const loginVal = (document.getElementById("loginName") as HTMLInputElement).value;
    const passVal = (document.getElementById("loginPassword") as HTMLInputElement).value;
    const alertMessage = document.getElementById("alertmessage");

    if (alertMessage){ 

      if (loginVal.length == 0 && passVal.length == 0)
      { 
        alertMessage.innerText = "Username and Password are both empty!";
        alertMessage.style.visibility = "visible";
        return;
      } 
      else if (loginVal.length != 0 && passVal.length == 0)
      {
        alertMessage.innerText = "Password is empty!";
        alertMessage.style.visibility = "visible";
        return;
      } 
      else if (loginVal.length == 0 && passVal.length != 0)
      {
        alertMessage.innerText = "Username is empty!";
        alertMessage.style.visibility = "visible"; 
        return;    
      } 

      alertMessage.style.visibility = "hidden";

      // Add api call here
      navFincancialsPage();
    }
    
  }

  function navForgotPassword()
  {
    navigate('/forgot');
  }

  function navFincancialsPage()
  {
    navigate('/financials');
  }

  return(
    <div id="loginDiv">
      <span id="inner-title">LOG IN</span><br />
      <h5 className={app.loginlabel}>Email</h5>
      <input type="text" id="loginName" className = {app.logininputs} placeholder="Email" onKeyUp={(e) => e.key === "Enter" && doLogin()}/><br />
      <h5 className={app.loginlabel}>Password</h5>
      <button id={app.forgotpasswordbutton} onClick={navForgotPassword}>Forgot Password?</button>
      <input type="password" id="loginPassword" className = {app.logininputs} placeholder="Password" onKeyUp={(e) => e.key === "Enter" && doLogin()}/><br />
      <h5 id = "alertmessage"></h5>
      <button className={app.loginbuttons} id={app.dologinbutton} onClick={doLogin}>Login</button>
      <span id="loginResult"></span>
    </div>
  );
}

export default Login;
