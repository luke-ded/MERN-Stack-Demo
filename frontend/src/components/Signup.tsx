import app from "../pages/App.module.css";
import show from '../assets/eye-password-show.png'
import dontshow from '../assets/eye-password-hide.png'
import { useNavigate } from 'react-router-dom';
import {useState} from 'react'

function Signup(){
  const navigate = useNavigate();
  
  const [isPasswordNumberValid, setIsPasswordNumberValid] = useState(false);
  const [isPasswordSymbolValid, setIsPasswordSymbolValid] = useState(false);
  const [isPasswordLengthValid, setIsPasswordLengthValid] = useState(false);
  const [isPasswordSame, setIsPasswordSame] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [showPasssword, setShowPassword] = useState(false);
  const [showConfirmPasssword, setShowConfirmPassword] = useState(false);

  function showPasswordHandler()
  {
    setShowPassword(!showPasssword);
  }

  function showConfirmPasswordHandler()
  {
    setShowConfirmPassword(!showConfirmPasssword);
  }

  function navFincancialsPage()
  {
    navigate('/financials');
  }

  async function doSignUp(event:any) : Promise<void> 
  {
    const FirstName = (document.getElementById("FirstName") as HTMLInputElement).value;
    const lastName = (document.getElementById("lastName") as HTMLInputElement).value;
    const Email = (document.getElementById("Email") as HTMLInputElement).value;
    const Password = (document.getElementById("loginPassword") as HTMLInputElement).value;
    const ConfirmPass = (document.getElementById("ConfPassword") as HTMLInputElement).value;

    const alertMessage = document.getElementById("alertmessage");

    if (alertMessage) {
      
      if (FirstName.length == 0 || lastName.length == 0 || Email.length == 0 || Password.length == 0 || ConfirmPass.length == 0)
      {
        alertMessage.innerText = "One or more fields are missing!";
        alertMessage.style.visibility = "visible";
        return;
      } 
      else if(!validateEmail())
      {
        alertMessage.innerText = "Email must be valid.";
        alertMessage.style.visibility = "visible";
        return;
      }
      else if (!validatePassword())
      {
        alertMessage.innerText = "Password must meet the requirements.";
        alertMessage.style.visibility = "visible";
        return;
      }
      else if (!isPasswordSame)
      {
        alertMessage.innerText = "Passwords must be the same.";
        alertMessage.style.visibility = "visible";
        return;
      }

      alertMessage.style.visibility = "hidden";

      // Add api call here

      event.preventDefault();
      var obj = {FName:FirstName,LName:lastName, Email:Email, Password:Password};
      var js = JSON.stringify(obj);
      try
      {
        const response = await fetch('http://salvagefinancial.xyz:5000/api/signup',
        {method:'POST',body:js,headers:{'Content-Type':'application/json'}});
        var res = JSON.parse(await response.text());
        if( res.Result == "User Already Exists" )
        {
          alertMessage.innerText = 'User already exists.';
          alertMessage.style.visibility = "visible"; 
        }
        else
        {
          // Add error handling here
          alertMessage.style.visibility = "hidden"; 
          navFincancialsPage();
        }
      }
      catch(error:any)
      {
          alert(error.toString());
          return;
      }
    }

    event.preventDefault();
  }


  let symbols = new Set(['!', '@', '#', '$', '%', '^', '&', '*']);
  let numbers = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);

  function validatePassword()
  {
    validatePasswordSame();
    
    console.log("validating");
      var password = (document.getElementById("loginPassword") as HTMLInputElement).value;
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
    if((document.getElementById("loginPassword") as HTMLInputElement).value
    === (document.getElementById("ConfPassword") as HTMLInputElement).value)
      setIsPasswordSame(true);
    else
      setIsPasswordSame(false);
  }


  function validateEmail()
  {
    const ret = String((document.getElementById("Email") as HTMLInputElement).value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    setIsValidEmail(Boolean(ret));

    return isValidEmail;
  }

  return(
    <div id="loginDiv">
      <span id="inner-title">SIGN UP</span><br />
      <h5 className={app.loginlabel}>First Name</h5>
      <input type="text" id="FirstName" className = {app.logininputs} placeholder="First Name" /><br />
      <h5 className={app.loginlabel}>Last Name</h5>
      <input type="text" id="lastName" className = {app.logininputs} placeholder="Last Name" /><br />
      <h5 className={app.loginlabel}>Email</h5>
      <input type="text" id="Email" className = {app.logininputs} placeholder="Email" onKeyUp={validateEmail}/><br />
      <h6 className={app.passwordinstructions} id={app.firstinstruction} style = {{color: isValidEmail ? '#58e96c' :'rgb(235, 83, 83)'}}>{isValidEmail ? '' : 'Invalid email.' }</h6><br />
      <h5 className={app.loginlabel}>Password</h5>
      
      <div className={app.showpassworddiv}>
        <input type= { showPasssword ? "text" :"password"} id="loginPassword" className = {app.logininputs} placeholder="Password" onKeyUp={validatePassword}/><br />
        <img id={app.showpasswordbutton} onClick={showPasswordHandler} src={showPasssword ? show : dontshow} />
      </div>

      <h6 className={app.passwordinstructions} id={app.firstinstruction}>Must contain at least&nbsp;</h6>
      <h6 className={app.passwordinstructions} id={app.passnumber} style = {{color: isPasswordNumberValid ? '#58e96c' :'rgb(235, 83, 83)'}}>1 number</h6>
      <h6 className={app.passwordinstructions}>,&nbsp;</h6>
      <h6 className={app.passwordinstructions} id={app.passsymbol} style = {{color: isPasswordSymbolValid ? '#58e96c' : 'rgb(235, 83, 83)'}}>1 symbol</h6>
      <h6 className={app.passwordinstructions}>,&nbsp;</h6>
      <h6 className={app.passwordinstructions} id={app.passlength} style = {{color: isPasswordLengthValid ? '#58e96c' : 'rgb(235, 83, 83)'}}>length of 8+</h6>
      <h6 className={app.passwordinstructions}>.</h6><br />
      
      <h5 className={app.loginlabel}>Confirm Password</h5>
      <div className={app.showpassworddiv}>
      <input type= { showConfirmPasssword ? "text" :"password"} id="ConfPassword" className = {app.logininputs} placeholder="Confirm Password" onKeyUp={validatePasswordSame}/><br />
        <img id={app.showpasswordbutton} onClick={showConfirmPasswordHandler} src={showConfirmPasssword ? show : dontshow} />
      </div>
      <h6 className={app.passwordinstructions} id={app.firstinstruction} style = {{color: isPasswordSame ? '#58e96c' :'rgb(235, 83, 83)'}}> {isPasswordSame ? '' : 'Passwords are not the same.'} </h6>
      <h5 id = "alertmessage"></h5>
      <button className={app.loginbuttons} id={app.dologinbutton} onClick={doSignUp}>Sign Up</button>
      <span id="loginResult"></span>
    </div>
  );
}

export default Signup;