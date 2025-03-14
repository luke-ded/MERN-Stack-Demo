import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import SignupPage from './pages/SignupPage.tsx';
import ForgotPage from './pages/ForgotPage.tsx';
import FinancialsPage from './pages/FinancialsPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import ResetPage from './pages/ResetPage.tsx';


function  App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot" element = {<ForgotPage />} />
        <Route path="/financials" element = {<FinancialsPage />} />
        <Route path="/dashboard" element = {<DashboardPage />} />
        <Route path="/reset" element = {<ResetPage />} />
        <Route path="*" element={<HomePage />} /> {/* default */}
      </Routes>
  </Router>
  )
}
export default App;
