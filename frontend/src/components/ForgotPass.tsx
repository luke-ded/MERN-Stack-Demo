import app from "../pages/App.module.css";
//import { useNavigate } from 'react-router-dom';


function ForgotPass(){


    function reclaimPass(event:any) : void{

        const Email = (document.getElementById("loginName") as HTMLInputElement).value;
        const alertMessage = document.getElementById("alertmessage");


        if (alertMessage) {

            if (Email.length == 0){
                
                alertMessage.innerText = "No Email is entered";
                alertMessage.style.visibility = "visible";

            } else {
    
                alertMessage.style.visibility = "hidden";
            }

        }

        event.preventDefault();
    }

   

    return(
        <div id = "loginDiv">
            <span id="inner-title">Forgot Password</span><br />
            <h5 className={app.loginlabel}>Enter your Email</h5>
            <input type="text" id="loginName" className = {app.logininputs} placeholder="Email" onKeyUp = {(e) => {if (e.key == 'Enter')ForgotPass()}} /><br/>
            <h5 id = "alertmessage"></h5>
            <button className={app.loginbuttons} id={app.dologinbutton} onClick={reclaimPass}>Reset Password</button>
        </div>
    );
}

export default ForgotPass;