import PageTitle from '../components/PageTitle.tsx';
import logo from '../assets/testlogo.png'
import app from '../pages/App.module.css'
import { useNavigate } from 'react-router-dom';


const NavBar = () => {
  const navigate = useNavigate();

  function navLogin()
  {
    if(location.pathname != '/login')
      navigate('/login'); 
    else
      navigate('/')
  }

  function navSignup()
  {
    if(location.pathname != '/signup')
      navigate('/signup');
    else
      navigate('/')
  }

  function navHome()
  {
    navigate('/')
  }

  function navDashboardPage()
  {
    if(location.pathname != '/dashboard')
      navigate('/dashboard');
  }

  function navFinancialsPage()
  {
    if(location.pathname != '/financials')
      navigate('/financials');
  }

  function doLogout()
  {
    // Add more here to actually log user out
    navHome();
  }
  // Not logged in
  if(location.pathname == '/' || location.pathname == '/signup' || location.pathname == '/login' || location.pathname == '/forgot' || location.pathname == '/reset')
    return (
      <div id = {app.NavBar}>
          <img src = {logo} id = {app.logoimg} onClick={navHome}></img>
          <PageTitle />
          <button className = {app.loginbuttons} id = {app.loginbutton} 
          onClick={navLogin}>Login</button>
          <button className = {app.loginbuttons} id = {app.signupbutton}
          onClick={navSignup}>Signup</button>
      </div>
    );
  // Logged in
  else
  {
    const data = localStorage.getItem('user_data');
    const parsedData = data ? JSON.parse(data) : null;

    return (
      <div id = {app.NavBar}>
        <img src = {logo} id = {app.logoimg} onClick={navHome}></img>
        <PageTitle />
        <button className={app.navbarbutton} onClick={navDashboardPage} 
        style={{backgroundColor: location.pathname == '/dashboard' ? "rgba(255, 255, 255, 0.15)":"transparent"}}>Dashboard</button>
        <button className={app.navbarbutton} onClick={navFinancialsPage}
        style={{backgroundColor: location.pathname == '/financials' ? "rgba(255, 255, 255, 0.15)":"transparent"}}>Financials</button>
        
        <h2 id={app.username}> {parsedData.User.FName} {parsedData.User.LName}</h2>
        <button className = {app.loginbuttons} id = {app.signupbutton} onClick={doLogout}>Log out</button>
          
      </div>);
  }
    
};

export default NavBar;
