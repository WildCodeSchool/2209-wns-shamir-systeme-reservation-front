import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Basket from './pages/Basket';

function App() {
  return (
    <div>
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
