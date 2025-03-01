import app from "../pages/App.module.css";
//import { useNavigate } from 'react-router-dom';


function ForgotPass(){

    function reclaimPass(event:any) : void{
        event.preventDefault();
    }

    return(
        <div id = "loginDiv">
            <span id="inner-title">Forgot Password</span><br />
            <h5 className={app.loginlabel}>Enter your Email</h5>
            <input type="text" id="loginName" className = {app.logininputs} placeholder="" /><br/>
            <button className={app.loginbuttons} id={app.dologinbutton} onClick={reclaimPass}>Reset Password</button>
        </div>
    );
}

export default ForgotPass;