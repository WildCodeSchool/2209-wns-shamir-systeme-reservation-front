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
  GET_PRODUCTS_BY_DATE,
  IS_ADMIN,
  GET_USER,
} from "./tools/queries";
import Home from "./pages/Home/Home";
import Catalog from "./pages/Catalog/Catalog";
import Contact from "./pages/Contact/Contact";
import Profile from "./pages/Profile/Profile";
import Cart from './pages/Cart/Cart';
import IProduct from "./interfaces/IProduct";
import ICartItem from "./interfaces/ICartItem";
import Footer from "./components/Footer/Footer";
import Login from "./components/LogIn/Login";
import { GET_TOKEN, CREATE_USER, UPDATE_USER } from "./tools/mutations";
import Signin from "./pages/Signin/Signin";
import MenuUser from "./components/MenuUser/MenuUser";
import ICategory from "./interfaces/ICategory";
import Admin from "./pages/Admin/Admin";
import AdminCustomers from "./pages/Admin/AdminCustomers";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminCategories from "./pages/Admin/AdminCategories";
import AdminReservations from "./pages/Admin/AdminReservations";
import { ProtectedRoute } from "./tools/ProtectedRoute";
import IUser from "./interfaces/IUser";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productsByDate, setProductsByDate] = useState<IProduct[]>([]);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [isMenuUserOpen, setIsMenuUserOpen] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<boolean>(false);
  const [logged, setLogged] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isEmailAlredyExist, setIsEmailAlredyExist] = useState<boolean>(false);
  const [isUserAdmin, setIsUserAdmin] = useState<boolean>(false);

  const [infoUser, setInfoUser] = useState<IUser | null | undefined>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogged(true);
      isAdmin({ variables: { token } })
        .then(({ data }) => {
          setIsUserAdmin(data.isAdmin);
        })
        .catch((error) => {
          console.log(error);
        });
      // get infoUser by token
      getUser({ variables: { token } })
        .then(({ data }) => {
          setInfoUser(data.getUser);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  const [getUser, { data: dataUser }] = useLazyQuery(GET_USER);

  const {
    loading: loadingCategory,
    data: dataCategory,
    error: errorCategory,
  } = useQuery(GET_ALL_CATEGORIES, {
    onCompleted: (dataCategory) => {
      setCategories(dataCategory.getAllCategories);
    },
  });

  const {
    loading: loadingAllProducts,
    data: dataAllProducts,
    error: errorAllProducts,
  } = useQuery(GET_ALL_PRODUCTS, {
    onCompleted: (dataAllProducts) => {
      setProducts(dataAllProducts.getAllProducts);
    },
  });

  const [isAdmin, { data: dataIsAdmin }] = useLazyQuery(IS_ADMIN);
  const [getProductsByDate, { data: dataProductsbyDate }] =
    useLazyQuery(GET_PRODUCTS_BY_DATE);
  const [getToken, { data: dataToken }] = useMutation(GET_TOKEN);
  const [createUser, { data: dataCreateUser }] = useMutation(CREATE_USER);
  const [updateUser, { data: dataUpdateUser }] = useMutation(UPDATE_USER);

  const handleLogin = async (
    email: string,
    password: string
  ): Promise<void> => {
    getToken({ variables: { password, email } })
      .then(({ data }) => {
        localStorage.setItem("token", data.getToken);
        setLoginError(false);
        setLogged(true);
        setLoginOpen(false);
        const token = localStorage.getItem("token");
        getUser({ variables: { token } })
          .then(({ data }) => {
            setInfoUser(data.getUser);
          })
          .catch((e) => {
            console.log(e);
          });
        window.location.href = "/";
      })
      .catch((error) => {
        setLoginError(true);
      });
  };

  const handleLogout = () => {
    setLogged(false);
    localStorage.removeItem("token");
    setIsMenuUserOpen(!isMenuUserOpen);
    window.location.href = "/";
  };

  const handleRegister = (
    lastname: string,
    firstname: string,
    email: string,
    phone: string,
    password: string,
    passwordConfirm: string
  ) => {
    createUser({
      variables: {
        firstname,
        lastname,
        phone,
        email,
        password,
        passwordConfirm,
      },
    })
      .then(({ data }) => {
        handleLogin(email, password);
        setIsEmailAlredyExist(false);
      })
      .catch((error) => {
        console.log(error);
        setIsEmailAlredyExist(true);
      });
  };

  const handleFindByDate = (dateFrom: string, dateTo: string) => {
    getProductsByDate({ variables: { dateFrom, dateTo } })
      .then(({ data }) => {
        setProductsByDate(data.getProductsByDate);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const reloadAllProducts = () => {
    setProductsByDate([]);
  };

  const handleUpdateUser = (idUser: number | undefined, userData: IUser) => {
    updateUser({ variables: { userId: idUser, userData: userData } })
      .then(({ data }) => {
        // console.log('data : ', data.updateUser);
        setInfoUser(data.updateUser);
      })
      .catch((error) => {
        console.log("erreur => ", error);
      });
  };

  //gestion du panier
  const [cart, setCart] = useState<ICartItem[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  
  const addToCart = (productId: number) => {
    setCart((prevCart: any) => {
    const index = prevCart.findIndex((item: ICartItem)=> item.id === productId);
    if (-1 !== index) {
      return [...prevCart.slice(0, index), { ...prevCart[index], qty: prevCart[index].qty + 1 }, ...prevCart.slice(index + 1)];
      } else {
      return [...prevCart, { id: productId, qty: 1 }];
    }
    });
    // updateSubtotal();
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart: any) => {
    const index = prevCart.findIndex((item: ICartItem) => item.id === productId);
    if (-1 !== index) {
      return [...prevCart.slice(0, index), { ...prevCart[index], qty: prevCart[index].qty - 1 }, ...prevCart.slice(index - 1)];
      } else {
      return [...prevCart, { id: productId, qty: - 1 }];
    }
    });
    updateSubtotal();
  };
  
  const updateQty = (productId: number, value: number) => {
    setCart((prevCart: any) => {
      const index = prevCart.findIndex((item: ICartItem) => item.id === productId);
      if (-1 !== index) {
        return [...prevCart.slice(0, index), { ...prevCart[index], qty: value }, ...prevCart.slice(index + 1)];
        } else {
        return prevCart;
      }
    });
    updateSubtotal();
  };
  
  const deleteItem = (productId: number) => {
    const reallyDelete = window.confirm("Souhaitez-vous confirmer la suppression de ce produit ?");
    if (reallyDelete) {
      setCart(prevCart => prevCart.filter(item => item.id !== productId));
      updateSubtotal();
    }
  };
  
  const updateSubtotal = () => {
    setSubtotal(prevSubtotal => {
      const newSubtotal = cart.reduce((acc, item) => {
        const product = products.find(product => product.id === item.id);
        if (product) acc += item.qty * product.price;
        return acc;
        }, 0);
      return newSubtotal;
    });
  };

  console.log('app', addToCart);

  return (
    <div className="app">
      <Router>
        {/* Les 2 navbar fixe top */}
        <NavbarMobile
          setLoginOpen={setLoginOpen}
          loginOpen={loginOpen}
          logged={logged}
          handleLogout={handleLogout}
          isMenuUserOpen={isMenuUserOpen}
          setIsMenuUserOpen={setIsMenuUserOpen}
        />
        <NavbarDesktop
          isUserAdmin={isUserAdmin}
          setLoginOpen={setLoginOpen}
          loginOpen={loginOpen}
          logged={logged}
          handleLogout={handleLogout}
          isMenuUserOpen={isMenuUserOpen}
          setIsMenuUserOpen={setIsMenuUserOpen}
        />

        {/* navbar version mobile */}
        <NavbarResponsive
          logged={logged}
          isMenuUserOpen={isMenuUserOpen}
          setIsMenuUserOpen={setIsMenuUserOpen}
        />

        {loginOpen && (
          <Login
            handleLogin={handleLogin}
            loginError={loginError}
            setLoginError={setLoginError}
          />
        )}
        {isMenuUserOpen && <MenuUser handleLogout={handleLogout} />}

        <Routes>
          <Route path="/" element={<Home products={products} productsByDate={productsByDate} />} />
          <Route path="/catalogue" element={<Catalog products={products} categories={categories} handleFindByDate={handleFindByDate} productsByDate={productsByDate} reloadAllProducts={reloadAllProducts} addToCart={addToCart} setCart={setCart} />} />
          <Route path="/contact" element={<Contact />} />
          {infoUser && 
            <Route path="/profil" element={<Profile infoUser={infoUser} handleUpdateUser={handleUpdateUser}/>} />
          }
          <Route path="/panier" element={<Cart products={products} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} updateQty={updateQty} deleteItem={deleteItem} updateSubtotal={updateSubtotal} setCart={setCart} />} />

          <Route element={<ProtectedRoute isUserAdmin={isUserAdmin} />}>
            <Route path="/admin">
              <Route index element={<Admin />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route
                path="products"
                element={
                  <AdminProducts products={products} categories={categories} />
                }
              />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="reservations" element={<AdminReservations />} />
            </Route>
          </Route>
          <Route
            path="/inscription"
            element={
              <Signin
                handleRegister={handleRegister}
                isEmailAlredyExist={isEmailAlredyExist}
              />
            }
          />
        </Routes>
        {!isUserAdmin && <Footer />}
      </Router>
    </div>
  );
}

export default App;
