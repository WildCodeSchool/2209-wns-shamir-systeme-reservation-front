import logo from "../../assets/images/512.png";
import profil from "../../assets/images/48.png";
import panier from "../../assets/images/47.png";
import { MdSettings } from "react-icons/md";
import "./navbar.css";
import { Container, Navbar, Offcanvas } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const NavbarDesktop = () => {
  const userDataStore = useSelector((state: RootState) => state.user.user);
  const userAdminStore = useSelector((state: RootState) => state.user.isAdmin);

  const toggleMenuUser = () => {
    const menuUser = document.querySelector("#menuUserId");
    if (menuUser?.classList.contains("d-block")) {
      menuUser.classList.remove("d-block");
      menuUser.classList.add("d-none");
    } else {
      menuUser?.classList.remove("d-none");
      menuUser?.classList.add("d-block");
    }
  };

  const toggleLogin = () => {
    const menuLogin = document.querySelector("#loginId");
    if (menuLogin?.classList.contains("d-block")) {
      menuLogin.classList.remove("d-block");
      menuLogin.classList.add("d-none");
    } else {
      menuLogin?.classList.remove("d-none");
      menuLogin?.classList.add("d-block");
    }
  };

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
              <Link to="/" className="nav-link mx-4 linkPage">
                Accueil
              </Link>
              <Link to="/catalogue" className="nav-link mx-4 linkPage">
                Catalogue
              </Link>
              <Link to="/contact" className="nav-link mx-4 linkPage">
                Contact
              </Link>
              {userDataStore.id !== 0 && (
                <Nav.Link className="nav-link mx-4 my-auto linkIcon">
                  <img
                    className="profilIcon"
                    src={profil}
                    alt="Profil"
                    onClick={toggleMenuUser}
                  />
                </Nav.Link>
              )}
              {userDataStore.id === 0 && (
                <Nav.Link
                  className="nav-link mx-4 linkPage "
                  onClick={toggleLogin}
                >
                  Se connecter / S'inscrire
                </Nav.Link>
              )}
              {userAdminStore && (
                <Link to="/admin" className="nav-link mx-4 my-auto linkIcon">
                  <MdSettings className="text-black settingsIcon" />
                </Link>
              )}
              {!userAdminStore && userDataStore.id !== 0 && (
                <Link to="/panier" className="nav-link mx-4 my-auto linkIcon">
                  <img className="panierIcon" src={panier} alt="Panier" />
                </Link>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavbarDesktop;
