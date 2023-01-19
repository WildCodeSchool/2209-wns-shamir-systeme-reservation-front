import logo from "../../assets/images/512.png";
import login from "../../assets/images/Login.png";
import "./navbar.css";
import "./navbarScript";
import { Container, Navbar } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

const NavbarMobile = ({setLoginOpen,loginOpen, logged, handleLogout} :any ) => {

  return (
    <Navbar expand="md" className="fixed-top" id="mainNavMobile">
      <Container fluid className="justify-content-center">
        <Navbar.Brand href="#" className="navbar-brand">
          <img className="logo ms-4" src={logo} alt="Profil" />
        </Navbar.Brand>
        <Nav className="justify-content-end flex-grow-1 pe-3">
          <Nav.Link href="#" className="mx-4 my-auto linkIconMobile text-end">
           { !logged && <img className="loginIcon" src={login} alt="Profil" onClick={() => setLoginOpen(!loginOpen)} /> }
           { logged && <p onClick={() => handleLogout()}  >LOGOUT</p> }

          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarMobile;