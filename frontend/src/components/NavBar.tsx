import PageTitle from '../components/PageTitle.tsx';
import logo from '../assets/testlogo.png'

const NavBar = () => {
  return (
    <div id = "NavBar">
        <img src = {logo} id = "logoimg"></img>
        <PageTitle />
    </div>
  );
};

export default NavBar;
