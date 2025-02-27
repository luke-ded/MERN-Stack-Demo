import PageTitle from '../components/PageTitle.tsx';
import Login from '../components/Login.tsx';
import app from './App.module.css';


const LoginPage = () => {
  return (
    <div className={app.LDiv}>
      <PageTitle />
      <Login />
    </div>
  );
};

export default LoginPage;
