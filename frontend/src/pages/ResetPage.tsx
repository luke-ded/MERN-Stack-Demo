import app from './App.module.css';
import NavBar from '../components/NavBar.tsx';
import ResetPass from '../components/ResetPass.tsx';
import logo from '../assets/testlogo.png'


const ResetPage = () => {
    return (
        <div>
            <NavBar/>
            <div className= {app.LDiv}>
                <img src = {logo} id = {app.loginlogoimg}></img>
                <ResetPass/>
            </div>
        </div>
    );
}

export default ResetPage;