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
import {
  GET_ALL_CATEGORIES,
  GET_ALL_PRODUCTS,
  IS_ADMIN,
  GET_USER,
} from "./graphql/queries";
import Home from "./pages/Home/Home";
import Catalog from "./pages/Catalog/Catalog";
import Contact from "./pages/Contact/Contact";
import Profile from "./pages/Profile/Profile";
import Cart from "./pages/Cart/Cart";
import Footer from "./components/Footer/Footer";
import Login from "./components/LogIn/Login";
import { GET_TOKEN } from "./graphql/mutations";
import MenuUser from "./components/MenuUser/MenuUser";
import { RootState } from "./store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setIsAdmin, setToken, setUser } from "./store/features/userSlice";
import ScrollToTop from "./tools/utils";
import { setCategories, setProducts } from "./store/features/productsSlice";
import SignIn from "./pages/SignIn/SignIn";
import AdminRouter from "./router/AdminRouter";

function App() {
  // USER LOGIN SIGNIN LOGOUT ************************************************************************

  const [isAdmin] = useLazyQuery(IS_ADMIN);
  const [getUser] = useLazyQuery(GET_USER);
  const [getToken] = useMutation(GET_TOKEN);

  const [loginError, setLoginError] = useState<boolean>(false);

  const userAdminStore = useSelector((state: RootState) => state.user.isAdmin);
  const userDataStore = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  // avec le token on récupère le user et savoir s'il est admin
  async function initUser(token: string) {
    try {
      const user = await getUser({ variables: { token } });
      dispatch(setUser(user.data.getUser));
      const isUserAdmin = await isAdmin({ variables: { token } });
      dispatch(setIsAdmin(isUserAdmin.data.isAdmin));
    } catch (error) {
      console.log(error);
    }
  }

  // on montage on récupère le token dans localStorage et si présent on évite au user de se relogger
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      initUser(token);
    }
  }, []);

  const handleLogin = async (
    email: string,
    password: string
  ): Promise<void> => {
    try {
      // on récupère le token par requête au serveur
      const token = await getToken({ variables: { password, email } });
      localStorage.setItem("token", token.data.getToken);
      dispatch(setToken(token.data.getToken));
      setLoginError(false);
      // avec le token on récupère le user et on requête pour savoir s'il est admin
      initUser(token.data.getToken);
      const menuLogin = document.querySelector("#loginId");
      menuLogin?.classList.remove("d-block");
      menuLogin?.classList.add("d-none");
    } catch (error) {
      setLoginError(true);
    }
  };

  // PRODUCT ************************************************************************

  const {} = useQuery(GET_ALL_CATEGORIES, {
    onCompleted: (dataCategory) => {
      dispatch(setCategories(dataCategory.getAllCategories));
    },
  });

  const {} = useQuery(GET_ALL_PRODUCTS, {
    onCompleted: (dataAllProducts) => {
      dispatch(setProducts(dataAllProducts.getAllProducts));
    },
  });

  return (
    <div className="app">
      <Router>
        <ScrollToTop />
        {/* Les 2 navbar fixe top */}
        <NavbarMobile />
        <NavbarDesktop />

        {/* navbar version mobile */}
        <NavbarResponsive />

        <Login
          handleLogin={handleLogin}
          loginError={loginError}
          setLoginError={setLoginError}
        />
        <MenuUser />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalog />} />
          <Route path="/contact" element={<Contact />} />
          {userDataStore && <Route path="/profil" element={<Profile />} />}
          <Route path="/panier" element={<Cart />} />
          <Route
            path="/inscription"
            element={<SignIn handleLogin={handleLogin} />}
          />
          <Route path="/admin/*" element={<AdminRouter />} />
        </Routes>
        {!userAdminStore && <Footer />}
      </Router>
    </div>
  );
}

export default App;
