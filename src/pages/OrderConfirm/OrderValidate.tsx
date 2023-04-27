import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import imgSurf from "../../assets/images/surf.jpeg"
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function OrderValidate() {
  useEffect(() => {
    Swal.fire({
      title: 'Confirmation',
      text: 'Commande validée',
      icon: 'success',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#0d83ab',
    })
  })
  return (
    <div className="container-sm">
    <main role="main" className="mainProfil">
      <div className="row justify-content-center mt-10">
          <h1 className="text-center titleResetPassword">Votre commande a bien été validée</h1>
          <Link className="text-dark RetourProfil text-decoration-none" to="/">
              <FontAwesomeIcon
              icon={faChevronLeft}
              className="fas fa-chevron-left me-3 iconRetourProfil"
              />
              Retour
          </Link>
        <div className="col-md-6 text-center mt-5 pt-5">
        <img className="text-white mb-5 rounded-circle2" src={imgSurf} alt="" />
          <p className="mb-5">Merci d'avoir passé commande sur Wild Booking</p>
          <p className="mb-5">Vous pouvez allez consulter votre commande sur votre profil <Link to="/profil">en cliquant ici</Link></p>
        </div>
      </div>
    </main>
  </div>
  )
}

export default OrderValidate