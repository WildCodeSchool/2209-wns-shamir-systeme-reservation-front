import logo from "../../assets/images/512.png";
import login from "../../assets/images/Login.png";
import "./navbar.css";
import { Container, Navbar } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const NavbarMobile = () => {
  const token = localStorage.getItem("token");

  // Déconnexion
  const logout = () => {
    localStorage.removeItem("token");
  };

  return (
    <Navbar expand="md" className="fixed-top" id="mainNavMobile">
      <Container fluid className="justify-content-center">
        <Navbar.Brand href="/" className="navbar-brand">
          <img className="logo ms-4" src={logo} alt="Profil" />
        </Navbar.Brand>
        {token ? (
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link
              href="/"
              className="nav-link mx-4 fs-1 text-end"
              onClick={logout}
            >
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="fas fa-chevron-left me-3"
              />
            </Nav.Link>
          </Nav>
        ) : (
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link
              href="/login"
              className="mx-4 my-auto linkIconMobile text-end"
            >
              <img className="loginIcon" src={login} alt="Profil" />
            </Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default NavbarMobile;
