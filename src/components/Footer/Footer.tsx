import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => (
  <div className='footer'>
    <div>
      <h4>Contact</h4>
      <p>10 Rue de la Montagne</p>
      <p>Alpes, FRANCE</p>
    </div>
    <div>
      <h4>Pages Site</h4>
      <Link to="/">
        Accueil
      </Link>
      <Link to="/catalogue">
        Catalogue
      </Link>
      <Link to="/contact">
        Contact
      </Link>
    </div>
    <div>
      <h4>Informations</h4>
      <Link to="*">
        CGV
      </Link>
      <Link to="*">
        CUG
      </Link>
    </div>
    <div className='copyright'><p>© Copyright WildBooking 2023</p></div>
  </div>
)

export default Footer;