import Login from "../components/Login.tsx";
//import app from "./App.module.css";
import NavBar from "../components/NavBar.tsx";
import logo from "../assets/testlogo.png";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  function navSignup() {
    navigate("/signup");
  }

  return (
    <div className="flex flex-col shrink-5 h-[90vh]">
    <NavBar />
    <div className="flex flex-col justify-center shrink-1 items-center flex-grow"> {/* Main content area */}
      <div className="bg-black/80 rounded-lg border border-[#6d91e8] max-w-md w-full"> {/* Login Popup */}
        <img className="w-1/7 h-auto mx-auto mt-4 mb-4" src={logo} alt="Logo" />
        <Login />
        
      </div>

      <div className="mt-4 flex justify-center bg-black/40 rounded-lg border border-[#6d91e8] p-1">
        <p>Don't have an account?</p>
        <button className="p-0 bg-transparent border-none ml-2 text-[#6d91e8] text-[1.5vh] font-bold" onClick={navSignup}>
          Sign up.
        </button>
      </div>
    </div>
  </div>
  );
};

export default LoginPage;
