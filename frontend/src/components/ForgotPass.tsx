import app from "../pages/App.module.css";
import { useNavigate } from 'react-router-dom';


function ForgotPass(){

    const navigate = useNavigate();

    function reclaimPass(event:any) : void{
        event.preventDefault();
    }

    function navLogin() {

        if (location.pathname != '/login')
            navigate('/login');// Change to forgot password page once set up
        else 
            navigate('/');
    }

    return(
        <div id = "loginDiv">
            <span id="inner-title">Forgot Password</span><br />
            <h5 className={app.loginlabel}>Enter your Email</h5>
            <input type="text" id="loginName" className = {app.logininputs} placeholder="" /><br/>
            <button className={app.loginbuttons} id={app.dologinbutton} onClick={reclaimPass}>Reset Password</button>
            <button className={app.loginbuttons} id={app.dologinbutton} onClick={navLogin}>Back to Login</button>
        </div>
    );
}

export default ForgotPass;