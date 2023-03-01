import hotline from "../../assets/images/hotline.png";
import paiements_sec from "../../assets/images/card.png";
import service_rapide from "../../assets/images/foudre.png";
import mountain from "../../assets/images/mountain.jpg";
import fullSkieur from "../../assets/images/full_skieur.jpg";
import mountainMan from "../../assets/images/mountain_man2.jpg";
import ProductCard from "../../components/ProductCard/ProductCard";
import SearchProductHome from "../../components/SearchProductHome/SearchProductHome";
import { GET_PRODUCTS_BY_DATE } from "../../graphql/queries";
import { useLazyQuery } from "@apollo/client";
import ICategory from "../../interfaces/ICategory";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Home = () => {
  const productsStore = useSelector(
    (state: RootState) => state.products.products
  );
  const categoriesStore = useSelector(
    (state: RootState) => state.products.categories
  );

  const [getProductsByDate, { data: dataProductsbyDate }] =
    useLazyQuery(GET_PRODUCTS_BY_DATE);

  const lastFourProducts = [...productsStore]
    .sort((a, b) => b.id - a.id)
    .slice(0, 4);

  const navigate = useNavigate();

  const handleFindByDateFromHome = (
    dateFrom: string,
    dateTo: string,
    categories: ICategory[]
  ) => {
    getProductsByDate({ variables: { dateFrom, dateTo } })
      .then(({ data }) => {
        navigate("/catalogue", {
          state: {
            productByDate: data.getProductsByDate,
            categoriesFromHome: categories,
            isSearchFromHome: true,
            dateFrom: dateFrom,
            dateTo: dateTo,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <header className="header_home">
        <p className="header_home_title">
          Renting Skis has never been easier before !
        </p>
        <button className="search_product">Rechercher un produit</button>
        <SearchProductHome
          handleFindByDateFromHome={handleFindByDateFromHome}
        />
        <p className="header_home_title2">
          Trouver le meilleur matériel pour vos loisirs
        </p>
      </header>

      <section className="home">
        <div className="home_products px-4">
          <h2>Derniers Produits Ajoutés</h2>
          <div className="row justify-content-center">
            {lastFourProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="homeService">
          <div className="row align-items-center bg-img-fixed pb-0">
            <span></span>
            <h3 className="text-white">Une expertise à votre service</h3>
            <div className="container">
              <div className="row justify-content-between">
                <div
                  className="col-md-4 mt-15 mb-30 text-center"
                  data-aos="fade-right"
                >
                  <img className="text-white my-3" src={hotline} alt="" />
                  <h4 className="text-white">Hotline</h4>
                  <p className="text-white">06 70 45 65 72</p>
                </div>
                <div
                  className="col-md-4 mt-15 mb-30 text-center"
                  data-aos="fade-up"
                >
                  <img
                    className="text-white my-3"
                    src={service_rapide}
                    alt=""
                  />
                  <h4 className="text-white">
                    Service <br />
                    Rapide
                  </h4>
                  <p className="text-white">Retrait sous 1 heure</p>
                </div>
                <div
                  className="col-md-4 mt-15 mb-30 text-center"
                  data-aos="fade-left"
                >
                  <img className="text-white my-3" src={paiements_sec} alt="" />
                  <h4 className="text-white">
                    Paiements <br /> Sécurisés
                  </h4>
                  <p className="text-white">CB, Paypal, ApplePay</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="home_infos_two">
          <div className="home_infos_two_description1">
            <img className="full_skieur" src={fullSkieur} alt="skieur" />
            <div>
              <p>
                Notre site de location de matériel de sport pour la montagne
                offre une large sélection d'équipements pour tous les niveaux et
                toutes les activités en montagne, que ce soit pour le ski, la
                randonnée, l'escalade ou encore le camping.
              </p>
              <br />
              <p>
                Nous proposons des produits de qualité pour garantir une
                expérience de montagne inoubliable. Avec notre service de
                réservation en ligne facile à utiliser, vous pouvez réserver
                votre équipement en quelques clics et le récupérer directement
                sur place.
              </p>
              <br />
              <p>
                Louez votre matériel de sport pour la montagne chez nous et
                profitez pleinement de vos aventures en montagne!
              </p>
            </div>
          </div>

          <div className="home_infos_two_description2">
            <div className="home_infos_two_description2_left justify-between">
              <div>
                <p>
                   Nous offrons également des conseils d'experts pour vous aider
                  à choisir le meilleur équipement pour votre activité en
                  montagne.
                </p>
              </div>
              <div className="img_mountain_info">
                <img src={mountain} alt="" />
              </div>
            </div>

            <div className="home_infos_two_description2_right">
              <img src={mountainMan} alt="" />
            </div>
          </div>
        </aside>
        <img className="img_mountain" src={mountain} alt="" />
      </section>
    </div>
  );
};

export default Home;
