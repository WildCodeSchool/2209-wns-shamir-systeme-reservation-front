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
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GET_ALL_CATEGORIES, GET_ALL_PRODUCTS, GET_USER } from "./tools/queries";
import Home from './pages/Home/Home';
import Catalog from './pages/Catalog/Catalog';
import Contact from './pages/Contact/Contact';
import Profile from './pages/Profile/Profile';
import Basket from './pages/Basket/Basket';
import IProduct from "./interfaces/IProduct";
import Footer from "./components/Footer/Footer";
import Login from "./components/LogIn/Login";
import { GET_TOKEN, CREATE_USER, UPDATE_USER } from './tools/mutations';
import Signin from "./pages/Signin/Signin";
import MenuUser from "./components/MenuUser/MenuUser";
import ICategory from "./interfaces/ICategory";
import IUser from "./interfaces/IUser";


function App() {

  const [products, setProducts] = useState<IProduct[]>([]);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [isMenuUserOpen, setIsMenuUserOpen] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<boolean>(false);
  const [logged, setLogged] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isEmailAlredyExist, setIsEmailAlredyExist] = useState<boolean>(false);
  const [infoUser, setInfoUser] = useState<IUser | null | undefined>();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLogged(true);
      // get infoUser by token
      getUser({variables: {token}}).then(({data}) => {
        setInfoUser(data.getUser);        
      }).catch(e => {
        console.log(e);
      });
    }
  }, []);

  const [getUser, { data : dataUser }] = useLazyQuery(GET_USER);

  const { loading : loadingCategory, data : dataCategory, error : errorCategory } = useQuery(GET_ALL_CATEGORIES, {
    onCompleted: (dataCategory) => {
      setCategories(dataCategory.getAllCategories);
    },
  });

  const { loading, data, error } = useQuery(GET_ALL_PRODUCTS, {
    onCompleted: (data) => {
      setProducts(data.getAllProducts);
    },
  }); 

  const [getToken, { data : dataToken }] = useMutation(GET_TOKEN);
  const [createUser, { data : dataCreateUser }] = useMutation(CREATE_USER);
  const [updateUser, { data : dataUpdateUser }] = useMutation(UPDATE_USER);

  const handleLogin = async(email: string, password: string): Promise<void>=> {
    getToken({ variables: { password , email }} )
      .then(({ data }) => {
        localStorage.setItem('token', data.getToken);
        setLoginError(false);
        setLogged(true);
        setLoginOpen(false);

        const token = localStorage.getItem('token');
        getUser({variables: {token}}).then(({data}) => {
          setInfoUser(data.getUser);        
        }).catch(e => {
          console.log(e);
        });
      }).catch(error => {
        setLoginError(true);
    });
  }

  const handleLogout = () => {
    setLogged(false);
    localStorage.removeItem("token");
    setIsMenuUserOpen(!isMenuUserOpen);
    window.location.href = '/';
  } 

  const handleRegister = (lastname: string, firstname: string, email: string, phone: string, password: string, passwordConfirm: string)=> {  
    createUser({ variables: { firstname, lastname, phone, email, password, passwordConfirm}} )
    .then(({ data }) => {
        handleLogin(email, password);
        setIsEmailAlredyExist(false);
    }).catch(error => {
      console.log(error);   
      setIsEmailAlredyExist(true);
      });
  } 

  const handleUpdateUser = (idUser: number | undefined, userData: IUser) => {
    updateUser({variables: {userId: idUser, userData: userData}})
    .then(({data}) => {
      // console.log('data : ', data.updateUser);
      setInfoUser(data.updateUser);  
    }).catch(error => {
      console.log('erreur => ', error);   
    });
  };

  return (
    <div className="app">
      <Router>
        {/* Les 2 navbar fixe top */}
        <NavbarMobile setLoginOpen={setLoginOpen} loginOpen={loginOpen} logged={logged} handleLogout={handleLogout} isMenuUserOpen={isMenuUserOpen} setIsMenuUserOpen={setIsMenuUserOpen} />
        <NavbarDesktop setLoginOpen={setLoginOpen} loginOpen={loginOpen} logged={logged} handleLogout={handleLogout} isMenuUserOpen={isMenuUserOpen} setIsMenuUserOpen={setIsMenuUserOpen}/>

        {/* navbar version mobile */}
        <NavbarResponsive  logged={logged} isMenuUserOpen={isMenuUserOpen} setIsMenuUserOpen={setIsMenuUserOpen} />

        {loginOpen && <Login handleLogin={handleLogin} loginError={loginError} setLoginError={setLoginError}/>}
        {isMenuUserOpen && <MenuUser handleLogout={handleLogout} />}
        
        <Routes>
          <Route path="/" element={<Home {...products} />} />
          <Route path="/catalogue" element={<Catalog products={products} categories={categories}/>} />
          <Route path="/contact" element={<Contact />} />
          {infoUser && 
            <Route path="/profil" element={<Profile infoUser={infoUser} handleUpdateUser={handleUpdateUser}/>} />
          }
          <Route path="/panier" element={<Basket />} />
          <Route path="/inscription" element={<Signin handleRegister={handleRegister} isEmailAlredyExist={isEmailAlredyExist} />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
