import app from "../pages/App.module.css";
import show from "../assets/eye-password-show.png";
import dontshow from "../assets/eye-password-hide.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();

  const [isPasswordNumberValid, setIsPasswordNumberValid] = useState(false);
  const [isPasswordSymbolValid, setIsPasswordSymbolValid] = useState(false);
  const [isPasswordLengthValid, setIsPasswordLengthValid] = useState(false);
  const [isPasswordSame, setIsPasswordSame] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [showPasssword, setShowPassword] = useState(false);
  const [showConfirmPasssword, setShowConfirmPassword] = useState(false);

  function showPasswordHandler() {
    setShowPassword(!showPasssword);
  }

  function showConfirmPasswordHandler() {
    setShowConfirmPassword(!showConfirmPasssword);
  }

  function navFincancialsPage() {
    navigate("/financials");
  }

  async function doSignUp(event: any): Promise<void> {
    const FirstName = (document.getElementById("FirstName") as HTMLInputElement)
      .value;
    const lastName = (document.getElementById("lastName") as HTMLInputElement)
      .value;
    const Email = (document.getElementById("Email") as HTMLInputElement).value;
    const Password = (
      document.getElementById("loginPassword") as HTMLInputElement
    ).value;
    const ConfirmPass = (
      document.getElementById("ConfPassword") as HTMLInputElement
    ).value;

    const alertMessage = document.getElementById("alertmessage");

    if (alertMessage) {
      if (
        FirstName.length == 0 ||
        lastName.length == 0 ||
        Email.length == 0 ||
        Password.length == 0 ||
        ConfirmPass.length == 0
      ) {
        alertMessage.innerText = "One or more fields are missing!";
        alertMessage.style.visibility = "visible";
        return;
      } else if (!validateEmail()) {
        alertMessage.innerText = "Email must be valid.";
        alertMessage.style.visibility = "visible";
        return;
      } else if (!validatePassword()) {
        alertMessage.innerText = "Password must meet the requirements.";
        alertMessage.style.visibility = "visible";
        return;
      } else if (!isPasswordSame) {
        alertMessage.innerText = "Passwords must be the same.";
        alertMessage.style.visibility = "visible";
        return;
      }

      alertMessage.style.visibility = "hidden";

      event.preventDefault();
      var obj = {
        FName: FirstName,
        LName: lastName,
        Email: Email,
        Password: Password,
      };
      var js = JSON.stringify(obj);
      try {
        const response = await fetch(
          "http://salvagefinancial.xyz:5000/api/signup",
          {
            method: "POST",
            body: js,
            headers: { "Content-Type": "application/json" },
          }
        );
        var res = JSON.parse(await response.text());
        if (res.Result == "User Already Exists") {
          alertMessage.innerText = "User already exists.";
          alertMessage.style.visibility = "visible";
        } else {
          // Add error handling here
          alertMessage.style.visibility = "hidden";
          navFincancialsPage();
        }
      } catch (error: any) {
        alert(error.toString());
        return;
      }
    }

    event.preventDefault();
  }

  let symbols = new Set(["!", "@", "#", "$", "%", "^", "&", "*"]);
  let numbers = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);

  function validatePassword() {
    validatePasswordSame();

    console.log("validating");
    var password = (
      document.getElementById("loginPassword") as HTMLInputElement
    ).value;
    var symbol = false;
    var number = false;

    for (let i = 0; i < password.length; i++) {
      if (symbols.has(password[i])) symbol = true;
      else if (numbers.has(password[i])) number = true;

      if (symbol && number) break;
    }

    setIsPasswordNumberValid(number);
    setIsPasswordSymbolValid(symbol);
    setIsPasswordLengthValid(password.length > 7);

    return symbol && number && password.length > 7;
  }

  function validatePasswordSame() {
    if (
      (document.getElementById("loginPassword") as HTMLInputElement).value ===
      (document.getElementById("ConfPassword") as HTMLInputElement).value
    )
      setIsPasswordSame(true);
    else setIsPasswordSame(false);
  }

  function validateEmail() {
    const ret = String(
      (document.getElementById("Email") as HTMLInputElement).value
    )
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

    setIsValidEmail(Boolean(ret));

    return isValidEmail;
  }

  return (
    <div className="flex flex-col justify-center w-[100%] h-160 shrink-1 items-center flex-grow" id="loginDiv">
      <span className="font-[Lucida Sans] font-bold text-[3vh] text-[#6d91e8]">SIGN UP</span>
      <br />
      <h5 className="self-start ml-[10%] text-lg">First Name</h5>
      <input className="w-8/10 text-lg rounded-sm border border-[#6d91e8] bg-blue-400/5 focus:outline-none focus:ring-1 focus:ring-[#7f8fb5] p-1" type="text" id="FirstName" placeholder="First Name" onKeyUp={(e) => {
        if (e.key === "Enter") 
        {
          var next = document.getElementById("lastName") as HTMLInputElement;
          next.focus();
        }
      }}/>
      <br />
      <h5 className="self-start ml-[10%] text-lg">Last Name</h5>
      <input className="w-8/10 text-lg rounded-sm border border-[#6d91e8] bg-blue-400/5 focus:outline-none focus:ring-1 focus:ring-[#7f8fb5] p-1" type="text" id="lastName" placeholder="Last Name" onKeyUp={(e) => {
        if (e.key === "Enter") 
        {
          var next = document.getElementById("Email") as HTMLInputElement;
          next.focus();
        }
      }}/>
      <br />
      <h5 className="self-start ml-[10%] text-lg">Email</h5>
      <input className="w-8/10 text-lg rounded-sm border border-[#6d91e8] bg-blue-400/5 focus:outline-none focus:ring-1 focus:ring-[#7f8fb5] p-1" type="text" id="Email" placeholder="Email" onKeyUp={(e) => {
        validateEmail();
        if (e.key === "Enter") 
        {
          var next = document.getElementById("loginPassword") as HTMLInputElement;
          next.focus();
        }
      }}/>
      <h6 className="self-start ml-[10%] text-[#bdc8e2] w-fit text-sm mt-2" id={app.firstinstruction} style={{ color: isValidEmail ? '#36eba6' :'#ff6384' }}>
          {isValidEmail ? "" : "Invalid email."}
      </h6>
      <br />
      <h5 className="self-start ml-[10%] text-lg">Password</h5>

      <div className="flex w-[100%] relative items-center">
          <input className="w-8/10 text-lg ml-[10%] rounded-sm border border-[#6d91e8] relative bg-blue-400/5 focus:outline-none focus:ring-1 focus:ring-[#7f8fb5] p-1" type={showPasssword ? "text" : "password" } id="loginPassword" placeholder="Password" onKeyUp={(e) => {
            validatePassword();
            if (e.key === "Enter") 
            {
              var next = document.getElementById("ConfPassword") as HTMLInputElement;
              next.focus();
            }
          }}/>
          <img className="h-[2vh] absolute z-10 ml-[84%] cursor-pointer" onClick={showPasswordHandler} src={showPasssword ? show : dontshow} />
      </div>

      <div className="flex w-[100%] whitespace-nowrap items-center mt-2">
        <h6 className="ml-[10%] text-[#bdc8e2] w-fit text-sm">Must contain at least&nbsp;</h6>
        <h6 className="text-[#bdc8e2] w-fit text-sm" id={app.passnumber} style = {{color: isPasswordNumberValid ? '#36eba6' :'#ff6384'}}>1 number</h6>
        <h6 className="text-[#bdc8e2] w-fit text-sm">,&nbsp;</h6>
        <h6 className="text-[#bdc8e2] w-fit text-sm" id={app.passsymbol} style = {{color: isPasswordSymbolValid ? '#36eba6' :'#ff6384'}}>1 symbol</h6>
        <h6 className="text-[#bdc8e2] w-fit text-sm">,&nbsp;</h6>
        <h6 className="text-[#bdc8e2] w-fit text-sm" id={app.passlength} style = {{color: isPasswordLengthValid ? '#36eba6' :'#ff6384'}}>length of 8+</h6>
        <h6 className="text-[#bdc8e2] w-fit text-sm">.</h6>
      </div>
      <br />

      <h5 className="self-start ml-[10%] text-lg">Confirm Password</h5>
      <div className="flex w-[100%] relative items-center">
          <input className="w-8/10 text-lg ml-[10%] rounded-sm border border-[#6d91e8] relative bg-blue-400/5 focus:outline-none focus:ring-1 focus:ring-[#7f8fb5] p-1" type={showConfirmPasssword ? "text" : "password" } id="ConfPassword" placeholder="Confirm Password" onKeyUp={(e) => {validatePasswordSame();  if (e.key === "Enter") {doSignUp(e);}}}/>
          <img className="h-[2vh] absolute z-10 ml-[84%] cursor-pointer" onClick={showConfirmPasswordHandler} src={showConfirmPasssword ? show : dontshow} />
      </div>
      <h6 className="self-start ml-[10%] text-[#bdc8e2] w-fit text-sm mt-2" style={{ color: isPasswordSame ? '#36eba6' :'#ff6384' }}>
          {isPasswordSame ? "" : "Passwords are not the same."}
      </h6>
      <h5 className="mt-3" id="alertmessage"></h5>
      <button className=" rounded-sm inline-block h-fit w-fit p-[3px] pl-[7px] pr-[7px] bg-transparent hover:bg-blue-400/15 hover:border-[#bdc8e2] border border-[#6d91e8] text-center text-[sm] m-[5%] cursor-pointer" onClick={doSignUp}>Sign Up</button>
  </div>
  );
}

export default Signup;
