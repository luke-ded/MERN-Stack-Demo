import app from './App.module.css';
import NavBar from '../components/NavBar.tsx';
import logo from '../assets/testlogo.png'
import Signup from '../components/Signup.tsx';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();

  function navLogin()
  {
    navigate('/login');
  }

  return (
    <div>
      <NavBar />
        <div className= {app.LDiv}>
        <img src = {logo} id = {app.loginlogoimg}></img>
            <Signup />
        </div>
        <div id={app.signupredirect}>
        <p id={app.signinredirectmsg}>Already have an account?</p>
        <button id={app.signinredirectbutton} onClick={navLogin}> Log in.</button>
      </div>
    </div>
  );
};

export default SignupPage;
