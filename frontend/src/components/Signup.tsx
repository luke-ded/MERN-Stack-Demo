import app from "../pages/App.module.css";
//import { useNavigate } from 'react-router-dom';

function Signup(){
  //const navigate = useNavigate();

  function doLogin(event:any) : void {
    event.preventDefault();
    alert('doIt()');
  }


  return(
    <div id="loginDiv">
      <span id="inner-title">SIGN UP</span><br />
      <h5 className={app.loginlabel}>First Name</h5>
      <input type="text" id="loginName" className = {app.logininputs} placeholder="First Name" /><br />
      <h5 className={app.loginlabel}>Last Name</h5>
      <input type="text" id="loginName" className = {app.logininputs} placeholder="Last Name" /><br />
      <h5 className={app.loginlabel}>Email</h5>
      <input type="text" id="loginName" className = {app.logininputs} placeholder="Email" /><br />
      <h5 className={app.loginlabel}>Password</h5>
      <input type="password" id="loginPassword" className = {app.logininputs} placeholder="Password" /><br />
      <h5 className={app.loginlabel}>Confirm Password</h5>
      <input type="password" id="loginPassword" className = {app.logininputs} placeholder="Confirm Password" /><br />
      <button className={app.loginbuttons} id={app.dologinbutton} onClick={doLogin}>Login</button>
      <span id="loginResult"></span>
    </div>
  );
}

export default Signup;