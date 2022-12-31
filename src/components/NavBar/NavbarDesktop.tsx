import logo from "../../assets/images/512.png";
import profil from "../../assets/images/48.png";
import panier from "../../assets/images/47.png";
import loginIcon from "../../assets/images/Login.png";
import { Container, Navbar, Offcanvas } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";

const NavbarDesktop = () => {
  const token = localStorage.getItem("token");

  // Déconnexion
  const logout = () => {
    localStorage.removeItem("token");
  };

  return (
    <Navbar expand="md" className="mb-3 fixed-top py-0" id="mainNav">
      <Container fluid>
        <Navbar.Brand href="/" className="navbar-brand">
          <img className="logo ms-4" src={logo} alt="Profil" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand`}
          aria-labelledby={`offcanvasNavbarLabel-expand`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
              Menu Burger
            </Offcanvas.Title>
          </Offcanvas.Header>
          {token ? (
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/" className="nav-link mx-4 linkPage">
                  Accueil
                </Nav.Link>
                <Nav.Link href="/catalogue" className="nav-link mx-4 linkPage">
                  Catalogue
                </Nav.Link>
                <Nav.Link href="/contact" className="nav-link mx-4 linkPage">
                  Contact
                </Nav.Link>
                <Nav.Link
                  href="/profil"
                  className="nav-link mx-4 my-auto linkIcon"
                >
                  <img className="profilIcon" src={profil} alt="Profil" />
                </Nav.Link>
                <Nav.Link
                  href="/panier"
                  className="nav-link mx-4 my-auto linkIcon"
                >
                  <img className="panierIcon" src={panier} alt="Panier" />
                </Nav.Link>
                <Nav.Link
                  href="/"
                  className="nav-link mx-4 logOut linkPage"
                  onClick={logout}
                >
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    className="fas fa-chevron-left me-3"
                  />
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          ) : (
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/" className="nav-link mx-4 linkPage">
                  Accueil
                </Nav.Link>
                <Nav.Link href="/catalogue" className="nav-link mx-4 linkPage">
                  Catalogue
                </Nav.Link>
                <Nav.Link href="/contact" className="nav-link mx-4 linkPage">
                  Contact
                </Nav.Link>
                <Nav.Link
                  href="/login"
                  className="nav-link mx-4 my-auto linkIcon"
                >
                  <img
                    className="loginIcon"
                    src={loginIcon}
                    alt="Se connecter"
                  />
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          )}
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavbarDesktop;
