import "./index.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/js/dist/collapse";
import "bootstrap/js/src/collapse.js";
import NavbarDesktop from "./components/NavBar/NavbarDesktop";
import NavbarResponsive from "./components/NavBar/NavBarResponsive";
import NavbarMobile from "./components/NavBar/NavbarMobile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_CATEGORIES, GET_ALL_PRODUCTS } from "./tools/queries";
import Home from "./pages/Home/Home";
import Catalog from "./pages/Catalog/Catalog";
import Contact from "./pages/Contact/Contact";
import Profile from "./pages/Profile/Profile";
import Basket from "./pages/Basket/Basket";
import IProduct from "./interfaces/IProduct";
import ICategory from "./interfaces/ICategory";
import Footer from "./components/Footer/Footer";
import SignIn from "./pages/Authentification/SignIn";
import { useMutation } from "@apollo/client";
import "../src/components/NavBar/navbarScript";
import { GET_TOKEN } from "./tools/mutation";


function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const { loading: loadingProduct, data: dataProduct, error: errorProduct } = useQuery(GET_ALL_PRODUCTS, {
    onCompleted: (dataProduct) => {
      setProducts(dataProduct.getAllProducts);
    },
  });

  const { loading : loadingCategory, data : dataCategory, error : errorCategory } = useQuery(GET_ALL_CATEGORIES, {
    onCompleted: (dataCategory) => {
      setCategories(dataCategory.getAllCategories);
    },
  });

  const [errorSign, setErroSign] = useState("");

  // Mutation SignIn with getToken
  const [loadToken] = useMutation(GET_TOKEN, {
    onCompleted(data) {
      // stock the token in localStore
      localStorage.setItem("token", data.getToken);
    },
    onError(error) {
      console.log(error.message);
      setErroSign(error.message);
    },
  });

  return (
    <div>
      <NavbarMobile />
      <NavbarDesktop />
      <NavbarResponsive />
      <Router>
          <Routes>
            <Route path="/" element={<Home {...products} />} />
            <Route path="/catalogue" element={<Catalog products={products} categories={categories}/>} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profil" element={<Profile />} />
            <Route path="/panier" element={<Basket />} />
            <Route path="/login" element={<SignIn LoadToken={loadToken} errorSign={errorSign} />} />
          </Routes>
       </Router>
       <Footer />
    </div>
  );
}

export default App;
