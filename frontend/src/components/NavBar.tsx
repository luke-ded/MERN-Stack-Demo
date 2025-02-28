import PageTitle from '../components/PageTitle.tsx';
import logo from '../assets/testlogo.png'
import app from '../pages/App.module.css'

const NavBar = () => {
  return (
    <div id = {app.NavBar}>
        <img src = {logo} id = {app.logoimg}></img>
        <PageTitle />
        <button className = {app.loginbuttons} id = {app.loginbutton}>Login</button>
        <button className = {app.loginbuttons} id = {app.signupbutton}>Signup</button>
    </div>
  );
};

export default NavBar;
