import PageTitle from '../components/PageTitle.tsx';
import logo from '../assets/testlogo.png'
import app from '../pages/App.module.css'
import { useNavigate } from 'react-router-dom';


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
    if(location.pathname != '/signup') // Change this to signup once set up
      navigate('/signup'); // Change this to signup once set up
    else
      navigate('/')
  }

  function navHome()
  {
    navigate('/')
  }

  return (
    <div id = {app.NavBar}>
        <img src = {logo} id = {app.logoimg} onClick={navHome}></img>
        <PageTitle />
        <button className = {app.loginbuttons} id = {app.loginbutton} 
        onClick={navLogin}>Login</button>
        <button className = {app.loginbuttons} id = {app.signupbutton}
        onClick={navSignup}>Signup</button>
    </div>
  );
};

export default NavBar;
