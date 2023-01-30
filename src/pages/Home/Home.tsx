import hotline from '../../assets/images/hotline.png';
import paiements_sec from '../../assets/images/card.png';
import service_rapide from '../../assets/images/foudre.png';
import mountain from '../../assets/images/mountain.jpg';
import fullSkieur from '../../assets/images/full_skieur.jpg';
import mountainMan from '../../assets/images/mountain_man2.jpg';
import IProduct from '../../interfaces/IProduct';
import ProductCard from '../../components/ProductCard/ProductCard';
import IProductProps from '../../interfaces/IProductProps';
import './home.css';
import IHomeProps from '../../interfaces/IHomeProps';


const Home = ({products, productsByDate}: IHomeProps) => {

  // transforme un objet qui contient une liste d'objects en tableau d'objets
  const productsArray = Object.values(products);

  return (
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
        <div className='home_products px-4'>
          <h2>Derniers Produits Ajoutés</h2>
          <div className='row justify-content-center'>
            {
              productsArray.filter((product) => product.id < 5).map((product) => (

                <ProductCard key={product.id} product={product} productsByDate={productsByDate} />

              ))
            }
          </div>

        </div>

        <div className="homeService">
          <div className="row align-items-center bg-img-fixed pb-0">
            <span></span>
              <h3 className='text-white'>Une expertise à votre service</h3>
            <div className="container">
              <div className="row justify-content-between">
                <div className="col-md-4 mt-15 mb-30 text-center" data-aos="fade-right">
                  <img className="text-white my-3" src={hotline} alt="" />
                  <h4 className="text-white">Hotline</h4>
                  <p className="text-white">06 70 45 65 72</p>
                </div>
                <div className="col-md-4 mt-15 mb-30 text-center" data-aos="fade-up">
                  <img className="text-white my-3" src={service_rapide} alt="" />
                  <h4 className="text-white">Service <br />Rapide</h4>
                  <p className="text-white">Retrait sous 1 heure</p>
                </div>
                <div className="col-md-4 mt-15 mb-30 text-center" data-aos="fade-left">
                  <img className="text-white my-3" src={paiements_sec} alt="" />
                  <h4 className="text-white">Paiements <br /> Sécurisés</h4>
                  <p className="text-white">CB, Paypal, ApplePay</p>
                </div>
              </div>
            </div>
          </div>
        </div>

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
    </div>

  )
}


export default Home;