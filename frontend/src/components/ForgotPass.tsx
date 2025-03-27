import app from "../pages/App.module.css";
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import {useState} from 'react'


function ForgotPass(){

    const navigate = useNavigate();
    const [value, setValue] = useState("");
    const [tempPass, setTempPass] = useState<number | null>(null)
    const [stageNum, setStageNum] = useState<number | null>(1)
    const [email, setEmail] = useState<string |null>(null)
    const [isPasswordNumberValid, setIsPasswordNumberValid] = useState(false);
    const [isPasswordSymbolValid, setIsPasswordSymbolValid] = useState(false);
    const [isPasswordLengthValid, setIsPasswordLengthValid] = useState(false);
    const [isPasswordSame, setIsPasswordSame] = useState(true);

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
                    setEmail(Email);
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

    let symbols = new Set(['!', '@', '#', '$', '%', '^', '&', '*']);
    let numbers = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);

    function validatePassword()
    {
        validatePasswordSame();
        
        console.log("validating");
        var password = (document.getElementById("firstPass") as HTMLInputElement).value;
        var symbol = false;
        var number = false;

        for(let i = 0; i < password.length; i++)
        {
            if(symbols.has(password[i]))
                symbol = true;
            else if(numbers.has(password[i]))
                number = true;

            if(symbol && number) break;
        }


        setIsPasswordNumberValid(number);
        setIsPasswordSymbolValid(symbol);
        setIsPasswordLengthValid(password.length > 7);

        return symbol && number && password.length > 7;
    }

    function validatePasswordSame()
    {
        if((document.getElementById("firstPass") as HTMLInputElement).value
        === (document.getElementById("secondPass") as HTMLInputElement).value)
        setIsPasswordSame(true);
        else
        setIsPasswordSame(false);
    }

    async function changePassword(event:any) : Promise<void> 
    {
        const FirstPass = (document.getElementById("firstPass") as HTMLInputElement).value;
        const secondPass = (document.getElementById("secondPass") as HTMLInputElement).value;
        const userEmail = email;
        const alertMessage = document.getElementById("alertmessage");

        if (alertMessage){

            if (FirstPass.length == 0 || secondPass.length == 0) {
                alertMessage.innerText = "One or more fields are missing!";
                alertMessage.style.visibility = "visible";
                return;
            } else if (!validatePassword()) {
                alertMessage.innerText = "Password must meet the requirements.";
                alertMessage.style.visibility = "visible";
                return;
            } else if (!isPasswordSame){
                alertMessage.innerText = "Passwords must be the same.";
                alertMessage.style.visibility = "visible";
                return;
            } else {
                alertMessage.style.visibility = "hidden";
            }

            event.preventDefault();
            var obj = { Email:userEmail, Password:FirstPass};
            var js = JSON.stringify(obj);

            try {
                const response = await fetch('http://salvagefinancial.xyz:5000/api/ResetPassword',
                {method:'POST',body:js,headers:{'Content-Type':'application/json'}});
                var res = JSON.parse(await response.text());
                if (res.result == "Changed password of user"){
                    navLogin();
                }
            } catch (error: any){
                alert(error.toString());
                return;
            }
        }
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
                <input type ="password" id ="firstPass" className = {app.logininputs} placeholder = "New Password"  value = {value} onChange = {(e) => setValue(e.target.value)} onKeyUp={validatePassword}></input><br/>

                <h6 className={app.passwordinstructions} id={app.firstinstruction}>Must contain at least&nbsp;</h6>
                <h6 className={app.passwordinstructions} id={app.passnumber} style = {{color: isPasswordNumberValid ? '#58e96c' :'rgb(235, 83, 83)'}}>1 number</h6>
                <h6 className={app.passwordinstructions}>,&nbsp;</h6>
                <h6 className={app.passwordinstructions} id={app.passsymbol} style = {{color: isPasswordSymbolValid ? '#58e96c' : 'rgb(235, 83, 83)'}}>1 symbol</h6>
                <h6 className={app.passwordinstructions}>,&nbsp;</h6>
                <h6 className={app.passwordinstructions} id={app.passlength} style = {{color: isPasswordLengthValid ? '#58e96c' : 'rgb(235, 83, 83)'}}>length of 8+</h6>
                <h6 className={app.passwordinstructions}>.</h6><br />

                <input type ="password" id ="secondPass" className = {app.logininputs} placeholder = "Confirm Password" onKeyUp={validatePasswordSame}></input><br/>
                <h6 className={app.passwordinstructions} id={app.firstinstruction} style = {{color: isPasswordSame ? '#58e96c' :'rgb(235, 83, 83)'}}> {isPasswordSame ? '' : 'Passwords are not the same.'} </h6>
                <h5 id = "alertmessage"></h5>
                <button className={app.loginbuttons} id={app.doChange} onClick={changePassword}>Confirm</button>
            </div>
        );
   }
}

export default ForgotPass;
