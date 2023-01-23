import "./menuUser.css";

function MenuUser({handleLogout}: any) {
  
  return (
    <div className="menuUser_container">
     
      <section className=" menuUser col-xl-2 col-lg-3 col-md-4 col-sm-10 col-11 d-flex flex-column  align-items-center bg-white">
        
        <div className="col-12 d-flex justify-content-center" onClick={() => { window.location.href = '/profil';}}>
         Mon compte
        </div>
        <div className="col-12 d-flex justify-content-center">
         Mes commandes
        </div>
        <div className="col-12 d-flex justify-content-center" onClick={handleLogout} >
         Deconnexion
        </div>
 
      </section>
    </div>

  )
}

export default MenuUser;