import app from "../pages/App.module.css";
//import { useNavigate } from 'react-router-dom';

function Signup(){
  //const navigate = useNavigate();

  function doSignUp(event:any) : void {

    const FirstName = (document.getElementById("FirstName") as HTMLInputElement).value;
    const lastName = (document.getElementById("lastName") as HTMLInputElement).value;
    const Email = (document.getElementById("Email") as HTMLInputElement).value;
    const Password = (document.getElementById("loginPassword") as HTMLInputElement).value;
    const ConfirmPass = (document.getElementById("ConfPassword") as HTMLInputElement).value;


    if (FirstName.length == 0 || lastName.length == 0 || Email.length == 0 || Password.length == 0 || ConfirmPass.length == 0){
      event.preventDefault();
      alert('One or more fields are missing!');
    } else {
      event.preventDefault();
      alert('doIt()');
    }

    
  }


  return(
    <div id="loginDiv">
      <span id="inner-title">SIGN UP</span><br />
      <h5 className={app.loginlabel}>First Name</h5>
      <input type="text" id="FirstName" className = {app.logininputs} placeholder="First Name" /><br />
      <h5 className={app.loginlabel}>Last Name</h5>
      <input type="text" id="lastName" className = {app.logininputs} placeholder="Last Name" /><br />
      <h5 className={app.loginlabel}>Email</h5>
      <input type="text" id="Email" className = {app.logininputs} placeholder="Email" /><br />
      <h5 className={app.loginlabel}>Password</h5>
      <input type="password" id="loginPassword" className = {app.logininputs} placeholder="Password" /><br />
      <h5 className={app.loginlabel}>Confirm Password</h5>
      <input type="password" id="ConfPassword" className = {app.logininputs} placeholder="Confirm Password" /><br />
      <button className={app.loginbuttons} id={app.dologinbutton} onClick={doSignUp}>Sign Up</button>
      <span id="loginResult"></span>
    </div>
  );
}

export default Signup;