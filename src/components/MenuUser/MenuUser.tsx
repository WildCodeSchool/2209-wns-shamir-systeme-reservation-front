import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { reset } from "../../store/features/userSlice";
import "./menuUser.css";

function MenuUser() {
  const dispatch = useDispatch();
  const menuUser = document.querySelector("#menuUserId");

  const handleLogout = () => {
    // on réinitialise redux + localStorage
    dispatch(reset());
    localStorage.clear();
    menuUser?.classList.remove("d-block");
    menuUser?.classList.add("d-none");
  };

  const handleCloseDiv = () => {
    if (menuUser?.classList.contains("d-block")) {
      menuUser.classList.remove("d-block");
      menuUser.classList.add("d-none");
    } else {
      menuUser?.classList.remove("d-none");
      menuUser?.classList.add("d-block");
    }
  };

  return (
    <div className="menuUser_container">
      <div id="menuUserId" className="menuUser d-none col-xl-2 col-lg-3 col-md-4 col-sm-10 col-11 d-flex flex-column align-items-center bg-white">
        <Link to="/profil" onClick={handleCloseDiv} className="col-12 d-flex justify-content-center pb-3">
          Mon compte
        </Link>
        <Link to="/" className="col-12 d-flex justify-content-center pb-3 pt-3" onClick={handleLogout}>
          Déconnexion
        </Link>
      </div>
    </div>
  );
}

export default MenuUser;
