import PageTitle from '../components/PageTitle.tsx';
import Login from '../components/Login.tsx';
import app from './src/App.module.css';

const LoginPage = () => {
  return (
    <body className={app.body}>
      <div>
        <PageTitle />
        <Login />
      </div>
    </body>
  );
};

export default LoginPage;
