import hotline from '../../assets/images/hotline.png';
import paiements_sec from '../../assets/images/card.png';
import service_rapide from '../../assets/images/foudre.png';
import mountain from '../../assets/images/mountain.jpg';
import fullSkieur from '../../assets/images/full_skieur.jpg';
import mountainMan from '../../assets/images/mountain_man2.jpg';

import './home.css';
import IProduct from '../../interfaces/IProduct';
import ProductCard from '../../components/ProductCard/ProductCard';
import Login from '../../components/LogIn/Login';
import { useState } from 'react';

const Home = (products: IProduct[]) => {

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

                <ProductCard key={product.id} id={product.id} name={product.name} image={product.image} description={''} price={product.price} quantity={product.quantity} category={product.category} />

              ))
            }
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
    </div>

  )
}


export default Home;