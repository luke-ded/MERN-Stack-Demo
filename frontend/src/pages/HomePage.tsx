import NavBar from '../components/NavBar.tsx';
import app from './App.module.css';

const HomePage = () => {
  return (
    <div>
        <NavBar />
        <div id = {app.main}>
            <h1 className={app.tagline}> "Inspirational" Tagline Here?</h1>
        </div>
    </div>
  );
};

export default HomePage;
