import { Link } from "react-router-dom";
import "./menuUser.css";

function MenuUser({ handleLogout, setIsMenuUserOpen }: any) {

  const handleCloseDiv = () => {
    const menuUser = document.querySelector("#menuUserId");
    menuUser?.classList.add("d-none");
    setIsMenuUserOpen(false);
  };

  return (
    <div className="menuUser_container">
      <div
        id="menuUserId"
        className="menuUser col-xl-2 col-lg-3 col-md-4 col-sm-10 col-11 d-flex flex-column  align-items-center bg-white"
      >
        <Link
          to="/profil"
          onClick={handleCloseDiv}
          className="col-12 d-flex justify-content-center"
        >
          Mon compte
        </Link>
        <Link
          to="/"
          className="col-12 d-flex justify-content-center"
          onClick={handleLogout}
        >
          Déconnexion
        </Link>
      </div>
    </div>
  );
}

export default MenuUser;
