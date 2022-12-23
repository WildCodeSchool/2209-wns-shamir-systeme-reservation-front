import logo from "../../assets/images/512.png";
import profil from "../../assets/images/48.png";
import panier from "../../assets/images/47.png";
import "./navbar.css";
import "./navbarScript";
import { Container, Navbar, Offcanvas } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

const NavbarDesktop = () => {
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
              <Nav.Link href="/profil" className="nav-link mx-4 my-auto linkIcon">
                <img className="profilIcon" src={profil} alt="Profil" />
              </Nav.Link>
              <Nav.Link href="/panier" className="nav-link mx-4 my-auto linkIcon">
                <img className="panierIcon" src={panier} alt="Panier" />
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavbarDesktop;
