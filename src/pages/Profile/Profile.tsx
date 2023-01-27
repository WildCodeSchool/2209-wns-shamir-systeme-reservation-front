import { useState } from 'react'
import { Badge, Button, Form, Modal } from 'react-bootstrap';
import IProfileProps from '../../interfaces/IProfileProps';
import IUser from '../../interfaces/IUser';
import './profile.css';

function Profile({infoUser, handleUpdateUser}: IProfileProps) {

  const [firstname, setFirstname] = useState<IUser["firstname"]>(infoUser?.firstname);
  const [lastname, setLastname] = useState<IUser["lastname"]>(infoUser?.lastname);
  const [phone, setPhone] = useState<IUser["phone"]>(infoUser?.phone);
  const [isPhoneError, setIsPhoneError] = useState<boolean>(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState<string>('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const handleCloseUpdateUser = () => setShowUpdateUser(false);
  const handleShowUpdateUser = () => setShowUpdateUser(true);
  

  const submitUpdateUser = (e: any): void => {
    e.preventDefault();
    const regexPhone = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    if (phone) {
      if (regexPhone.test(phone)) {
        setIsPhoneError(false);
        const UserData: IUser = { 
          firstname: firstname, 
          lastname: lastname, 
          phone: phone 
        }
    
        if (firstname && lastname && phone) {
          handleUpdateUser(infoUser.id, UserData);
          setShowUpdateUser(false);
        }
      } else {
        setIsPhoneError(true);
        setPhoneErrorMessage("Votre numero de telephone n'est pas correct");
      }
    } else {
      setIsPhoneError(true);
      setPhoneErrorMessage("Saisissez votre numéro de téléphone");
    }

    
  }

  return (
  <div className="container">
		<main role="main" className="mainProfil">
			<div className="row justify-content-center mt-10">

				<div className="col-md-3">
					<div className="card-profil p-4 rounded">
						<p className="mb-3 text-center mb-3">
							<strong>Bonjour {infoUser?.firstname} {infoUser?.lastname}</strong>
						</p>
						<div className="row justify-content-center">
								<img src="https://picsum.photos/200" className="rounded-circle p-0 mb-1" alt="avatar"/>
						</div>

						<div className="text-center mt-3">
              <Button className="btnWild" onClick={handleShowUpdateUser}>
                Modifier le profil
              </Button>
						</div>
						<hr />
						<div className="text-center mt-3">
              <Button className="btnWild" onClick={handleShow}>
                Supprimer mon compte
              </Button>
						</div>
					</div>
				</div>

				<div className="col">
					<div className="card-profil p-4 rounded">
						<h4>Mes commandes</h4>
						<hr />
						<div className="row">
							{/* si pas de commande */}
							<p className="text-center mt-4">Vous n'avez pas passer de commande pour le moment</p>
							{/* sinon si user co et commande */}
              <table className="table table-hover align-middle text-center">
                <tbody>
                      <tr>
                        <td>
                          Commande
                          <br/>
                          N°<strong>ComD 345</strong>
                        </td>
                        <td>
                          Statut
                          <br/>
                          <p>
                            <Badge pill bg="dark">
                              en cours de préparation
                            </Badge>
                            </p>
                        </td>
                        <td>
                          Passé le :
                          <br/>
                          <strong>2034-33-33</strong>
                        </td>
                        <td>
                          Total :
                          <strong> 200
                            €</strong>
                        </td>
                        <td>
                          <a href="" className="btn btn-outline-dark btn-sm">Voir</a>
                        </td>
                      </tr>
                </tbody>
              </table>
						</div>
            <ul className="pagination justify-content-center mt-3">
              <li className="page-item activePagination d-flex">
                <a href="" className="page-link mx-1">1</a>
                <a href="" className="page-link mx-1">2</a>
              </li>
            </ul>
					</div>
				</div>

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title className='fs-2'>Suppression du compte</Modal.Title>
          </Modal.Header>
          <Modal.Body className='py-4'>Etes vous sûr de vouloir supprimer votre compte ?</Modal.Body>
          <Modal.Footer>
            <Button className='btnsecondary' onClick={handleClose}>
              Annuler
            </Button>
            <Button className='btnWild' onClick={handleClose}>
              Supprimer définitivement
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showUpdateUser} onHide={handleCloseUpdateUser} centered>
          <Modal.Header closeButton>
            <Modal.Title className='fs-2'>Modification du compte</Modal.Title>
          </Modal.Header>
          <Modal.Body className='py-4'>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control className='fs-3' type="text" placeholder="Nom" value={lastname} onChange={(e) => {
                setLastname(e.target.value);
              }} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prénom</Form.Label>
              <Form.Control className='fs-3' type="text" placeholder="Prénom" value={firstname} onChange={(e) => {
                setFirstname(e.target.value);
              }} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Téléphone</Form.Label>
              <Form.Control className={isPhoneError ? 'border border-2 border-danger fs-3' : 'fs-3'} type="text" placeholder="0606060606" value={phone} onChange={(e) => {
                setPhone(e.target.value);
              }} />
              {isPhoneError && <p style={{ color: "red" }}>{phoneErrorMessage}</p>}
            </Form.Group>
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button className='btnsecondary' onClick={handleCloseUpdateUser}>
              Annuler
            </Button>
            <Button className='btnWild' onClick={submitUpdateUser}>
              Valider
            </Button>
          </Modal.Footer>
        </Modal>

			</div>

			<hr className="featurette-divider"/>
		</main>
	</div>
  )
}

export default Profile