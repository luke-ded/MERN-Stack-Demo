import app from "../pages/App.module.css";
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import {useState} from 'react'


function ForgotPass(){

    const navigate = useNavigate();
    const [tempPass, setTempPass] = useState<number | null>(null)
    const [stageNum, setStageNum] = useState<number | null>(1)
    const [email, setemail] = useState<string |null>(null)
    const [isEmailSent, setEmailSent] = useState(false);

    function reclaimPass(){

        const Email = (document.getElementById("loginName") as HTMLInputElement).value;
        const alertMessage = document.getElementById("alertmessage");
        const serviceID = "service_joh3vl9"; // EmailJS Service ID
        const templateID = "template_0wir29e"; // EmailJS Template ID
        const publicKey = "SjEKgAnbxGXtlizVm"; // EmailJS Public Key
        //Website: emailjs.com
        //Email: salvagefinancial416@gmail.com
        //Password: COP4331$
        //works for gmail emails only for now, will add more later

        if (alertMessage) {

            if (Email.length == 0){
                
                alertMessage.innerText = "No Email is entered";
                alertMessage.style.visibility = "visible";
                return;

            } else {
    
                alertMessage.style.visibility = "hidden";
        
                if (validateEmail()){

                    const pass = Math.round((Math.random() * 100000));
                    const oneTimePassword = pass.toString();
                    setTempPass(pass);

                    const templateParams = { //parameters for email builder
                        toEmail: Email,
                        OneTimePass: oneTimePassword
                    };

                    emailjs.send(serviceID, templateID, templateParams, publicKey)
                    setStageNum(2);
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

   function verifyOneTimePass(){

    const oneTimePass = (document.getElementById("loginNames") as HTMLInputElement).value;
    const alertMessage = document.getElementById("alertmessage");

        if (alertMessage){
            if (oneTimePass.length != 5){
                alertMessage.innerText = "Invalid Code";
                alertMessage.style.visibility = "visible";
                return;
            } else {
                var tempNum = parseInt(oneTimePass);

                if (tempNum == tempPass){
                    alertMessage.style.visibility = "hidden";
                    setStageNum(3);
                } else {
                    alertMessage.innerText = "Incorrect Code";
                    alertMessage.style.visibility = "visible";
                    return;
                }
            }
        }
    
    }

    function navReset()
    {

        navigate('/reset');
    }

    function resetPass()
    {
        return;
    }

    if (stageNum == 1){
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
   } else if (stageNum == 2){
        return(
            <div id = "loginDivs">
                <span id="inner-title">Forgot Password</span><br />
                <h5 className={app.loginlabel}>Reset your Password</h5>
                <input type="number" id="loginNames" className = {app.logininputs} placeholder="5-digit-code" onKeyUp={(e) => e.key === "Enter" && verifyOneTimePass()}/><br/>
                <h5 id = "alertmessage"></h5>
                <button className={app.loginbuttons} id={app.doVerify} onClick={verifyOneTimePass}>Confirm</button>
            </div>
        );
   } else if (stageNum == 3){
        return(
            <div id = "loginDivs">
                <span id="inner-title">Reset Password</span><br />
                <h5 className={app.loginlabel}>Reset your Password</h5>
                <input type ="password" id ="firstPass" className = {app.logininputs} placeholder = "New Password" value = ""></input><br/>
                <input type ="password" id ="firstPass" className = {app.logininputs} placeholder = "Confirm Password" value = ""></input>
                <h5 id = "alertmessage"></h5>
                <button className={app.loginbuttons} id={app.doVerify} onClick={resetPass}>Confirm</button>
            </div>
        );
   }
}

export default ForgotPass;
