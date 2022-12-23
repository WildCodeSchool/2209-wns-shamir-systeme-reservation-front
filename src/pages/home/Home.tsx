import hotline from '../../assets/images/hotline.png';
import paiements_sec from '../../assets/images/card.png';
import service_rapide from '../../assets/images/foudre.png';
import mountain from '../../assets/images/mountain.jpg';
import fullSkieur from '../../assets/images/full_skieur.jpg';
import mountainMan from '../../assets/images/mountain_man2.jpg';

import Footer from '../../components/Footer/Footer';
import './home.css';


const Home = () => (
  <div>

    <header className='header_home' >
      <p className='header_home_title'>Renting Skis has never been easier before !</p>
      <button className="btn search_product">
        Rechercher un produit
      </button>
      <div className='home_search_prod_by_date'>
        <div>
          <p>quel produit ?</p>
          <input type="text" />
        </div>
        <div>
          <p>debut de location</p>
          <input type="date" />
        </div>
        <div>
          <p>fin de location</p>
          <input type="date" />
        </div>
        <button>Rechercher</button>
      </div>
      <p className='header_home_title2'>Trouver le meilleur matériel pour vos loisirs</p>
    </header>

    <section className='home'>

      <div className='home_products'>
        <h2>Derniers Produits Ajoutés</h2>
        <div className="card card_product" >
          <img className="card-img-top" src="https://glisshop-glisshop-fr-storage.omn.proximis.com/Imagestorage/imagesSynchro/735/735/ea89531591b6bab4107ec4a56ee247da74118afa_H22ROSSCHA191428_0.jpeg" alt="Card cap" />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
        <div className="card card_product" >
          <img className="card-img-top" src="https://glisshop-glisshop-fr-storage.omn.proximis.com/Imagestorage/imagesSynchro/280/280/2a3c97ed7cc6fb5e6eb282318f3d382bab44cdd9_H20SALOCHA001_1.jpeg" alt="Card cap" />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
        <div className="card card_product" >
          <img className="card-img-top" src="https://glisshop-glisshop-fr-storage.omn.proximis.com/Imagestorage/imagesSynchro/735/735/0714f9d1b46e72aa8413e249c6932f50b037e7b9_VH20DALBCHA012_0.jpeg" alt="Card cap" />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
        <div className="card card_product" >
          <img className="card-img-top" src="https://glisshop-glisshop-fr-storage.omn.proximis.com/Imagestorage/imagesSynchro/735/735/ea89531591b6bab4107ec4a56ee247da74118afa_H22ROSSCHA191428_0.jpeg" alt="Card cap" />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>

      <aside className='home_infos_one'>
        <h2>Une expertise à votre service</h2>
        <div>
          <img src={hotline} alt="" />
          <span>Hotline</span>
          <p>06 70 45 65 72</p>
        </div>
        <div><img src={service_rapide} alt="" />
        <span>Service <br />Rapide</span>
          <p>Retrait sous 1 heure</p>
          </div>
        <div><img src={paiements_sec} alt="" />
        <span>Paiements <br /> Sécurisés</span>
          <p>CB, Paypal, ApplePay</p>
        </div>
      </aside>

      <aside className='home_infos_two'>
        <div className='home_infos_two_description1'>
          <img className='full_skieur' src={fullSkieur} alt="skieur" />
          <div>
            <h3>Titre H3</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipis illo provident similique inventore magnam labore officiis ipsam nulla rem. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipis illo provident similique inventore magnam labore officiis ipsam nulla rem. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipis illo provident similique inventore magnam labore officiis ipsam nulla rem. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>

        <div className='home_infos_two_description2'>

          <div className='home_infos_two_description2_left'>
            <div>
              <h3>Titre H3</h3>
              <p>Lorem ipsum dolor sit, amet consectetur adipis illo provident similique inventore magnam labore officiis ipsam nulla rem. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <img className='img_mountain_info' src={mountain} alt="" />
          </div>

          <div className='home_infos_two_description2_right'>
            <img src={mountainMan} alt="" />
            <div>
              <p>Lorem ipsum dolor sit ameteos. Culpa numquam eveniet quisquam asperiores molestias obcaecati velit veritatis quam officia nisi aspernatur sapiente enim odio quae, voluptate unde?</p>
            </div>
          </div>

        </div>

      </aside>
      <img className='img_mountain' src={mountain} alt="" />
    </section>
    <Footer />


  </div>

)


export default Home;