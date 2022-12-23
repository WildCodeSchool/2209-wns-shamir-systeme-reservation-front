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
import { GET_ALL_PRODUCTS } from "./tools/queries";
import Home from './pages/home/Home';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Basket from './pages/Basket';
import IProduct from "./interfaces/IProduct";


function App() {

  const [products, setProducts] = useState<IProduct[]>([]);

  const { loading, data, error } = useQuery(GET_ALL_PRODUCTS, {
    onCompleted: (data) => {
      setProducts(data.getAllProducts);
    },
  });

  // console.log(products);

  return (
    <div>
      {/* Les 2 navbar fixe top */}
      <NavbarMobile />
      <NavbarDesktop />

      {/* navbar version mobile */}
      <NavbarResponsive />

      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogue" element={<Catalog {...products} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profil" element={<Profile />} />
            <Route path="/panier" element={<Basket />} />
          </Routes>
       </Router>

    </div>
  );
}

export default App;
