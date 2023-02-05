import login from "../../assets/images/Login.png";
import boutique from "../../assets/images/boutique.png";
import produit from "../../assets/images/produit.png";
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
  
  const getTokenInLocal = localStorage.getItem("token");
  const cartStore = useSelector((state: RootState) => state.cart.cart);
  
  let totalQtyInCart = 0;
  cartStore.forEach((element) => (totalQtyInCart += element.qtyInCart));
  
  const menuUser = document.querySelector("#menuUserId");
  const menuLogin = document.querySelector("#loginId");
  
  const toggleMenuUser = () => {
    if (menuUser?.classList.contains("d-block")) {
      menuUser.classList.remove("d-block");
      menuUser.classList.add("d-none");
    } else {
      menuUser?.classList.remove("d-none");
      menuUser?.classList.add("d-block");
    }
  };

  const toggleLogin = () => {
    if (menuLogin?.classList.contains("d-block")) {
      menuLogin.classList.remove("d-block");
      menuLogin.classList.add("d-none");
    } else {
      menuLogin?.classList.remove("d-none");
      menuLogin?.classList.add("d-block");
    }
  };

  window.addEventListener("click", (e) => {
    const el = e.target ? (e.target as HTMLElement) : null;
    if ((!el?.classList.contains('profilIcon')) && menuUser?.classList.contains("d-block")){
      menuUser.classList.remove("d-block");
      menuUser.classList.add("d-none");
    };
    if ((!el?.classList.contains('loginMenu')) && menuLogin?.classList.contains("d-block")){
      menuLogin.classList.remove("d-block");
      menuLogin.classList.add("d-none");
    };
  });


  return (
    <>
      <Navbar expand="md" className="mb-3 fixed-top py-0" id="mainNav">
        <Container fluid>
          <Link to="/" className="navbar-brand">
            <img className="logo ms-4" src={logo} alt="Profil" />
          </Link>
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
                    className="loginMenu nav-link mx-4 linkPage "
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
                  <>
                    {totalQtyInCart > 0 && <span className="pillCart">{totalQtyInCart}</span>}
                    <Link to="/panier" className="nav-link mx-4 my-auto linkIcon">
                      <img className="panierIcon" src={panier} alt="Panier" />
                    </Link>
                  </>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      {/* NAV TOP MOBILE */}
      <Navbar expand="md" className="fixed-top" id="mainNavMobile">
        <Container fluid className="justify-content-center">
          <Navbar.Brand className="navbar-brand">
            <Link to="/">
              <img className="logo ms-4" src={logo} alt="Accueil" />
            </Link>
          </Navbar.Brand>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link className="mx-4 my-auto linkIconMobile text-end">
              {!( getTokenInLocal) && (
                <img className="loginIcon" src={login} alt="Login" onClick={toggleLogin} />
              )} 
            </Nav.Link>
            { getTokenInLocal && (
              <>
                {totalQtyInCart > 0 && <span className="pillCartMobile">{totalQtyInCart}</span>}
                <Link to="/panier" className="mx-4 my-auto linkIconMobile text-end">
                  <img className="panierIcon" src={panier} alt="Panier" />
                </Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
      {/* NAV BOTTOM MOBILE */}
      <Navbar expand="md" className="fixed-bottom py-0" id="mainNavResponsive">
      <Container fluid className="justify-content-evenly">
        <Nav className="flex-row pe-3 iconListMobile">
          <Link to="/" className="my-auto linkIconResponsive text-center">
            <img className="boutiqueIcon" src={boutique} alt="Accueil" />
            <br />
            Accueil
          </Link>
          <Link to="/catalogue" className="my-auto linkIconResponsive text-center">
            <img className="produitIcon" src={produit} alt="Produits" />
            <br />
            Produits
          </Link>
          {( getTokenInLocal) && (
            <Nav.Link className="my-auto linkIconResponsive text-center">
              <img className="profilIcon" src={profil} alt="Profil" onClick={toggleMenuUser}/>
              <br />
              Profil
            </Nav.Link>
          )} 
        </Nav>
      </Container>
      </Navbar>
    </>
  );
};

export default NavbarDesktop;
