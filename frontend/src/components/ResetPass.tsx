import app from "../pages/App.module.css";



function ResetPass(){

    return(
        <div id ="ResetDiv">
            <span id="inner-title">Reset Password</span><br />
            <h5 className={app.loginlabel}>New Password</h5>
            <input type="text" id="FirstReset" className = {app.logininputs} placeholder="Password"/><br/>
            <h5 className={app.loginlabel}>Confirm Password</h5>
            <input type="text" id="ConfirmReset" className = {app.logininputs} placeholder="Confirm Password"/><br/>
            <button className={app.loginbuttons} id={app.dologinbutton}>Change Password</button>
            <h5 id = "alertMessage"></h5>
        </div>
    );

}

export default ResetPass;