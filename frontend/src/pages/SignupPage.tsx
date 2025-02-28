import app from './App.module.css';
import NavBar from '../components/NavBar.tsx';
import logo from '../assets/testlogo.png'
import Signup from '../components/Signup.tsx';

const SignupPage = () => {
  return (
    <div>
      <NavBar />
        <div className= {app.LDiv}>
        <img src = {logo} id = {app.loginlogoimg}></img>
            <Signup />
        </div>
    </div>
  );
};

export default SignupPage;
