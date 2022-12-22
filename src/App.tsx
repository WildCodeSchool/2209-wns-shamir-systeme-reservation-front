import "./index.css";
import "./App.css";
import Aos from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/js/dist/collapse";
import "bootstrap/js/src/collapse.js";
import NavbarDesktop from "./components/NavBar/NavbarDesktop";
import NavbarResponsive from "./components/NavBar/NavBarResponsive";
import NavbarMobile from "./components/NavBar/NavbarMobile";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Basket from './pages/Basket';

function App() {
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
            <Route path="/catalogue" element={<Catalog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profil" element={<Profile />} />
            <Route path="/panier" element={<Basket />} />
          </Routes>
       </Router>

    </div>
  );
}

export default App;
