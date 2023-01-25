import logo from "../../assets/images/512.png";
import profil from "../../assets/images/48.png";
import panier from "../../assets/images/47.png";
import { MdSettings } from "react-icons/md";
import "./navbar.css";
import "./navbarScript";
import { Container, Navbar, Offcanvas } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import isAdmin from "../../tools/isAdmin";


const NavbarDesktop = ({ setLoginOpen, loginOpen, logged, setIsMenuUserOpen, isMenuUserOpen }: any) => {
  return (
    <Navbar expand="md" className="mb-3 fixed-top py-0" id="mainNav">
      <Container fluid>
        <Navbar.Brand href="#" className="navbar-brand">
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
              {logged && <Nav.Link className="nav-link mx-4 my-auto linkIcon">
                <img className="profilIcon" src={profil} alt="Profil" onClick={() => setIsMenuUserOpen(!isMenuUserOpen)} />
              </Nav.Link>}
              {!logged && <Nav.Link className="nav-link mx-4 linkPage " onClick={() => setLoginOpen(!loginOpen)}>
                Se connecter / S'inscrire
              </Nav.Link>}
              {isAdmin(localStorage.token) ? 
              logged && 
              <Nav.Link href="/admin" className="nav-link mx-4 my-auto linkIcon">
                <MdSettings className="text-black settingsIcon"/> 
              </Nav.Link>
              : logged && 
              <Nav.Link href="/panier" className="nav-link mx-4 my-auto linkIcon">
                <img className="panierIcon" src={panier} alt="Panier" />
              </Nav.Link>}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavbarDesktop;

