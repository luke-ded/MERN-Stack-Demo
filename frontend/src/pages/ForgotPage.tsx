import app from './App.module.css';
import NavBar from '../components/NavBar.tsx';
import logo from '../assets/testlogo.png'
import ForgotPass from '../components/ForgotPass.tsx';


const ForgotPage = () => {
    return (
        <div>
            <NavBar/>
            <div className= {app.LDiv}>
                <img src = {logo} id = {app.loginlogoimg}></img>
                <ForgotPass />
            </div>
        </div>
    );
}

export default ForgotPage;