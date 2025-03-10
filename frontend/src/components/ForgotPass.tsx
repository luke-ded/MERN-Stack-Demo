import app from "../pages/App.module.css";
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';


function ForgotPass(){

    const navigate = useNavigate();

    function reclaimPass(){

        const Email = (document.getElementById("loginName") as HTMLInputElement).value;
        const alertMessage = document.getElementById("alertmessage");
        const serviceID = "service_joh3vl9"; // EmailJS Service ID
        const templateID = "template_0wir29e"; // EmailJS Template ID
        const publicKey = "SjEKgAnbxGXtlizVm"; // EmailJS Public Key
        //Website: emailjs.com
        //Email: salvagefinancial416@gmail.com
        //Password: COP4331$

        if (alertMessage) {

            if (Email.length == 0){
                
                alertMessage.innerText = "No Email is entered";
                alertMessage.style.visibility = "visible";
                return;

            } else {
    
                alertMessage.style.visibility = "hidden";
        
                if (validateEmail()){

                    const oneTimePassword = Math.round((Math.random() * 100000)).toString();

                    const templateParams = { //parameters for email builder
                        toEmail: Email,
                        OneTimePass: oneTimePassword
                    };

                    emailjs.send(serviceID, templateID, templateParams, publicKey)
                    alertMessage.innerText = "Sent to " + Email;
                    alertMessage.style.visibility = "visible";
                    return;
                } else {

                    alertMessage.innerText = "Invalid Email";
                    alertMessage.style.visibility = "visible";
                    return;
                }
            }

        }

        
    }

    function navLogin(){

        navigate('/login');
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
            <button className={app.loginbuttons} id={app.doEmail} onClick={reclaimPass}>Confirm</button>
            <button className={app.loginbuttons} id = {app.backToLogin} onClick = {navLogin}>Back To Login</button>
        </div>
    );
}

export default ForgotPass;