import PageTitle from '../components/PageTitle.tsx';
import logo from '../assets/testlogo.png'
import app from '../pages/App.module.css'
import { useNavigate, useLocation } from 'react-router-dom';


const NavBar = () => {
  const navigate = useNavigate();

  function navLogin()
  {
    if(location.pathname != '/login')
      navigate('/login'); 
    else
      navigate('/')
  }

  function navSignup()
  {
    if(location.pathname != '/login') // Change this to signup once set up
      navigate('/login'); // Change this to signup once set up
    else
      navigate('/')
  }

  return (
    <div id = {app.NavBar}>
        <img src = {logo} id = {app.logoimg}></img>
        <PageTitle />
        <button className = {app.loginbuttons} id = {app.loginbutton} 
        onClick={navLogin}>Login</button>
        <button className = {app.loginbuttons} id = {app.signupbutton}
        onClick={navSignup}>Signup</button>
    </div>
  );
};

export default NavBar;
