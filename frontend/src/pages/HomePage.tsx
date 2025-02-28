import PageTitle from '../components/PageTitle.tsx';
import Login from '../components/Login.tsx';
import NavBar from '../components/NavBar.tsx';
import app from './App.module.css';

const HomePage = () => {
  return (
    <div>
        <NavBar />
        <div id = {app.main}>

        </div>
    </div>
  );
};

export default HomePage;
