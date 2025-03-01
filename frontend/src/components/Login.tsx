import app from "../pages/App.module.css";
import { useNavigate } from 'react-router-dom';

function Login(){
  const navigate = useNavigate();

  function doLogin(event:any) : void {


    const loginVal = (document.getElementById("loginName") as HTMLInputElement).value;
    const passVal = (document.getElementById("loginPassword") as HTMLInputElement).value;

    if (loginVal.length == 0 && passVal.length == 0){ 
      event.preventDefault();
      alert('Both username and password is empty');
    } else if (loginVal.length != 0 && passVal.length == 0){
      event.preventDefault();
      alert('Password is empty');
    } else if (loginVal.length == 0 && passVal.length != 0){
      event.preventDefault();
      alert('Username is emmpty');
    } else {
      event.preventDefault();
      alert('doIt()');
    }

  }

  function navForgotPassword()
  {
    navigate('/'); // Change to forgot password page once set up
  }

  return(
    <div id="loginDiv">
      <span id="inner-title">LOG IN</span><br />
      <h5 className={app.loginlabel}>Email</h5>
      <input type="text" id="loginName" className = {app.logininputs} placeholder="Email" /><br />
      <h5 className={app.loginlabel}>Password</h5>
      <button id={app.forgotpasswordbutton} onClick={navForgotPassword}>Forgot Password?</button>
      <input type="password" id="loginPassword" className = {app.logininputs} placeholder="Password" /><br />
      <button className={app.loginbuttons} id={app.dologinbutton} onClick={doLogin}>Login</button>
      <span id="loginResult"></span>
    </div>
  );
}

export default Login;
