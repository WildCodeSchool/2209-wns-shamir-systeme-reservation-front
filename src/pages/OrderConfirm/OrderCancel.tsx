import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import imgChute from "../../assets/images/chute.jpeg"
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

import { useEffect } from 'react';

function OrderCancel() {

  useEffect(() => {
    Swal.fire({
      title: 'Une erreur est survenue',
      text: 'Commande refusé',
      icon: 'error',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#DD6B55',
    })
  })
  return (
    <div className="container-sm">
    <main role="main" className="mainProfil">
      <div className="row justify-content-center">
          <h1 className="text-center titleResetPassword">Votre commande a été refusé</h1>
          <Link className="text-dark RetourProfil text-decoration-none" to="/">
              <FontAwesomeIcon
              icon={faChevronLeft}
              className="fas fa-chevron-left me-3 iconRetourProfil"
              />
              Retour
          </Link>
        <div className="col-md-6 text-center mt-5">
          <img className="text-white mb-5 rounded-circle2" src={imgChute} alt="" />
          <p className="mb-3">Toute nos excuses</p>
          <p className="mb-5">Une erreur est survenue, merci de réessayer.</p>
        </div>
      </div>
    </main>
  </div>
  )
}

export default OrderCancel