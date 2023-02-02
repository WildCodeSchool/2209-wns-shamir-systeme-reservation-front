import { useNavigate } from "react-router-dom";
import boutique from "../../assets/images/boutique.png";
import produit from "../../assets/images/produit.png";
import profil from "../../assets/images/profil.png";
import "./navbar.css";
import { Container, Navbar } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

const NavbarResponse = ({ setIsMenuUserOpen, isMenuUserOpen}: any) => {

  const navigate = useNavigate();

  return (
    <Navbar expand="md" className="fixed-bottom py-0" id="mainNavResponsive">
      <Container fluid className="justify-content-center">
        <Nav className="justify-content-center flex-row pe-3">
          <Nav.Link href="/" className="my-auto linkIconResponsive text-center">
            <img className="boutiqueIcon" src={boutique} alt="Profil" />
            <br />
            Accueil
          </Nav.Link>
          <Nav.Link
            href="/catalogue"
            className="my-auto linkIconResponsive text-center"
          >
            <img className="produitIcon" src={produit} alt="Profil" />
            <br />
            Produits
          </Nav.Link>
          {/* {logged && ( */}
            <Nav.Link className="my-auto linkIconResponsive text-center">
              <img
                className="produitIcon"
                src={profil}
                alt="Profil"
                onClick={() => setIsMenuUserOpen(!isMenuUserOpen)}
              />
              <br />
              Profil
            </Nav.Link>
          {/* )} */}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarResponse;
