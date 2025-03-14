import app from "../pages/App.module.css";



function ResetPass(){

    async function resetPassword(event: any) : Promise<void>
    {
        const userEmail = localStorage.getItem("userEmail");
        const newPassword = (document.getElementById("ConfirmReset") as HTMLInputElement).value;
        const alertMessage = document.getElementById("alertMessage");

        if (alertMessage) {
            var email = userEmail;
            var newPass = newPassword;
            event.preventDefault();
            var obj = {Email:email,Password:newPass};
            var js = JSON.stringify(obj);

            try
            {
                const response = await fetch('http://salvagefinancial.xyz:5000/api/ResetPassword',
                {method:'POST',body:js,headers:{'Content-Type':'application/json'}});
                var res = JSON.parse(await response.text());
                if( res._id <= 0 )
                {
                    alertMessage.innerText = 'Failed to reset password';
                    alertMessage.style.visibility = "visible"; 
                }
                else
                {
                    alertMessage.innerText = 'Successfully changed password, you can close this tab';
                    localStorage.setItem('user_data', JSON.stringify(res));
            

            
                }
            } 
            catch(error:any)
            {
                alert(error.toString());
                return;
            }

        }
    }

    return(
        <div id ="ResetDiv">
            <span id="inner-title">Reset Password</span><br />
            <h5 className={app.loginlabel}>New Password</h5>
            <input type="text" id="FirstReset" className = {app.logininputs} placeholder="Password"/><br/>
            <h5 className={app.loginlabel}>Confirm Password</h5>
            <input type="text" id="ConfirmReset" className = {app.logininputs} placeholder="Confirm Password"/><br/>
            <h5 id = "alertMessage"></h5>
            <button className={app.loginbuttons} id={app.dologinbutton} onClick={resetPassword}>Change Password</button>
        </div>
    );

}

export default ResetPass;