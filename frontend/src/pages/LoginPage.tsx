import PageTitle from '../components/PageTitle.tsx';
import Login from '../components/Login.tsx';
import app from './App.module.css';
import NavBar from '../components/NavBar.tsx';

const LoginPage = () => {
  return (
    <div>
      <NavBar />
        <div className= {app.LDiv}>
          <PageTitle />
          <Login />
        </div>
    </div>
  );
};

export default LoginPage;
