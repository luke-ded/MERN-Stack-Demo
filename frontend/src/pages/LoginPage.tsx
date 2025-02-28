import PageTitle from '../components/PageTitle.tsx';
import Login from '../components/Login.tsx';
import app from './App.module.css';
import NavBar from '../components/NavBar.tsx';
import logo from '../assets/testlogo.png'

const LoginPage = () => {
  return (
    <div>
      <NavBar />
        <div className= {app.LDiv}>
        <img src = {logo} id = {app.loginlogoimg}></img>
          <Login />
        </div>
    </div>
  );
};

export default LoginPage;
