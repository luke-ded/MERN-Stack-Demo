import PageTitle from '../components/PageTitle.tsx';
import Login from '../components/Login.tsx';
import app from './App.module.css';

const LoginPage = () => {
  return (
    <body className={app.body}>
     <ul className = {app.ul}>
        <li className = {app.li}><a className = {app.a} href = "http://salvagefinancial.xyz/">Login</a></li>
        <li className = {app.li}><a className = {app.a}href = "http://salvagefinancial.xyz/">Signup</a></li>
     </ul>
      <div className= {app.LDiv}>
        <PageTitle />
        <Login />
      </div>
    </body>
  );
};

export default LoginPage;
