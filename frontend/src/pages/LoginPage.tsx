import Login from '../components/Login.tsx';
import app from './App.module.css';
import NavBar from '../components/NavBar.tsx';
import logo from '../assets/testlogo.png'
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  function navSignup()
  {
    navigate('/signup');
  }

  return (
    <div>
      <NavBar />
        <div className= {app.LDiv}>
        <img src = {logo} id = {app.loginlogoimg}></img>
          <Login />
        </div>
        <div id={app.signinredirect}>
          <p>Don't have an account?</p>
          <button id={app.signinredirectbutton} onClick={navSignup}> Sign up.</button>
        </div>
    </div>
  );
};

export default LoginPage;
