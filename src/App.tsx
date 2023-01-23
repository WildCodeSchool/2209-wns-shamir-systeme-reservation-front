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
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "./tools/queries";
import Home from './pages/Home/Home';
import Catalog from './pages/Catalog/Catalog';
import Contact from './pages/Contact/Contact';
import Profile from './pages/Profile/Profile';
import Basket from './pages/Basket/Basket';
import IProduct from "./interfaces/IProduct";
import Footer from "./components/Footer/Footer";
import Login from "./components/LogIn/Login";
import {GET_TOKEN, CREATE_USER} from "./tools/mutations";
import Signin from "./pages/Singin/Signin";



function App() {

  const [products, setProducts] = useState<IProduct[]>([]);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<boolean>(false);
  const [logged, setLogged] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLogged(true);
    }
  }, []);

  const { loading, data, error } = useQuery(GET_ALL_PRODUCTS, {
    onCompleted: (data) => {
      setProducts(data.getAllProducts);
    },
  }); 

  const [getToken, { data : dataToken }] = useMutation(GET_TOKEN);
  const [createUser, { data : dataCreateUser }] = useMutation(CREATE_USER);



  const handleLogin = async(email: string, password: string): Promise<void>=> {
    getToken({ variables: { password , email }} )
      .then(({ data }) => {
        localStorage.setItem('token', data.getToken);
        setLoginError(false);
        setLogged(true);
        setLoginOpen(!loginOpen);
        window.location.href = '/';
      }).catch(error => {
        setLoginError(true);
        });
  }

  const handleLogout = () => {
    setLogged(false);
    localStorage.removeItem("token");
  } 

  const handleRegister = (lastname: string, firstname: string, email: string, phone: string, password: string, passwordConfirm: string)=> {  
    createUser({ variables: { firstname, lastname, phone, email, password, passwordConfirm}} )
    .then(({ data }) => {
        handleLogin(email, password);
    }).catch(error => {
      console.log(error);   
      });
    
  } 

  return (
    <div className="app">
      {/* Les 2 navbar fixe top */}
      <NavbarMobile setLoginOpen={setLoginOpen} loginOpen={loginOpen} logged={logged} handleLogout={handleLogout}/>
      <NavbarDesktop setLoginOpen={setLoginOpen} loginOpen={loginOpen} logged={logged} handleLogout={handleLogout}/>

      {/* navbar version mobile */}
      <NavbarResponsive />

      {loginOpen && <Login handleLogin={handleLogin} loginError={loginError} setLoginError={setLoginError}/>}

      <Router>
        <Routes>
          <Route path="/" element={<Home {...products} />} />
          <Route path="/catalogue" element={<Catalog {...products} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="/panier" element={<Basket />} />
          <Route path="/inscription" element={<Signin handleRegister={handleRegister} />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
