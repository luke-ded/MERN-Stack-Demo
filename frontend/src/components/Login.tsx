import app from "../pages/App.module.css";
import show from '../assets/eye-password-show.png'
import dontshow from '../assets/eye-password-hide.png'
import { useNavigate } from 'react-router-dom';
import {useState} from 'react'

function Login(){
  const navigate = useNavigate();

  const [showPasssword, setShowPassword] = useState(false);

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

  function showPasswordHandler()
  {
    setShowPassword(!showPasssword);
  }

  return(
    <div id="loginDiv">
      <span id="inner-title">LOG IN</span><br />
      <h5 className={app.loginlabel}>Email</h5>
      <input type="text" id="loginName" className = {app.logininputs} placeholder="Email" onKeyUp={(e) => e.key === "Enter" && doLogin()}/><br />

      <h5 className={app.loginlabel}>Password</h5>
      <button id={app.forgotpasswordbutton} onClick={navForgotPassword}>Forgot Password?</button>

      <div className={app.showpassworddiv}>
        <input type= { showPasssword ? "text" :"password"} id={app.loginPassword} className = {app.logininputs} placeholder="Password" onKeyUp={(e) => e.key === "Enter" && doLogin()}/><br />
        <img id={app.showpasswordbutton} onClick={showPasswordHandler} src={showPasssword ? show : dontshow} />
      </div>

      <h5 id = "alertmessage"></h5>
      <button className={app.loginbuttons} id={app.dologinbutton} onClick={doLogin}>Login</button>
      <span id="loginResult"></span>
    </div>
  );
}

export default Login;
