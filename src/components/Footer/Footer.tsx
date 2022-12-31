import './footer.css';


const Footer = () => (
  <div className='footer'>
    <div>
      <h4>Contact</h4>
     <p>10 Rue de la Montaigne.</p>
     <p>Alpes, FRANCE</p>
      </div>
    <div>
      <h4>Pages Site</h4>
      <a href="">Accueil</a>
      <a href="">Catalogue</a>
      <a href="">Contact</a>
    </div>
    <div>
      <h4>Informations</h4>
      <a href="">CGV</a>
      <a href="">CUG</a>
    </div>
    <div className='copyright'><p>© Copyright WildBooking 2023</p></div>
  </div>

)


export default Footer;