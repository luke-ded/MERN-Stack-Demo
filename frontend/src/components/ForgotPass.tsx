import app from "../pages/App.module.css";
//import { useNavigate } from 'react-router-dom';



function ForgotPass(){

    
    function reclaimPass(){

        const Email = (document.getElementById("loginName") as HTMLInputElement).value;
        const alertMessage = document.getElementById("alertmessage");


        if (alertMessage) {

            if (Email.length == 0){
                
                alertMessage.innerText = "No Email is entered";
                alertMessage.style.visibility = "visible";

            } else {
    
                alertMessage.style.visibility = "hidden";
        
                if (validateEmail()){

                    alertMessage.innerText = "Sent to " + Email;
                    alertMessage.style.visibility = "visible";
                } else {

                    alertMessage.innerText = "Invalid Email";
                    alertMessage.style.visibility = "visible";
                }
            }

        }

        
    }

   
   function validateEmail(){
        return String((document.getElementById("loginName") as HTMLInputElement).value)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
   }

   

    return(
        <div id = "loginDiv">
            <span id="inner-title">Forgot Password</span><br />
            <h5 className={app.loginlabel}>Enter your Email</h5>
            <input type="text" id="loginName" className = {app.logininputs} placeholder="Email" onKeyUp={(e) => e.key === "Enter" && reclaimPass()}/><br/>
            <h5 id = "alertmessage"></h5>
            <button className={app.loginbuttons} id={app.dologinbutton} onClick={reclaimPass}>Confirm</button>
        </div>
    );
}

export default ForgotPass;