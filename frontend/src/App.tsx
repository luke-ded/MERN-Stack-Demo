import './App.css';
import LoginPage from './pages/LoginPage.tsx';
import app from './App.module.css';

function  App(){
  return(
  <div className={app.LDiv}>
    <LoginPage />
  </div>
  )
}
export default App;
