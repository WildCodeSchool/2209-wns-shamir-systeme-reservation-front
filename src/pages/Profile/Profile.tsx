import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Badge, Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import IUser from "../../interfaces/IUser";
import { RootState } from "../../store";
import {
  setIsOrdersExist,
  setOrders,
  setUser,
} from "../../store/features/userSlice";
import { UPDATE_USER } from "../../graphql/mutations";
import "./profile.css";
import { GET_ORDER_BY_CUSTOMER } from "../../graphql/queries";
import OrderCard from "../../components/OrderCard/OrderCard";

function Profile() {
  const userDataStore = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const [firstname, setFirstname] = useState<IUser["firstname"]>(
    userDataStore?.firstname
  );
  const [lastname, setLastname] = useState<IUser["lastname"]>(
    userDataStore?.lastname
  );
  const [phone, setPhone] = useState<IUser["phone"]>(userDataStore?.phone);
  const [isPhoneError, setIsPhoneError] = useState<boolean>(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState<string>("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const handleCloseUpdateUser = () => setShowUpdateUser(false);
  const handleShowUpdateUser = () => setShowUpdateUser(true);

  const [updateUser, { data: dataUpdateUser }] = useMutation(UPDATE_USER);

  const [getOrderByCustomer] = useLazyQuery(GET_ORDER_BY_CUSTOMER);

  const orders = useSelector((state: RootState) => state.user.orders);
  const isOrderExist = useSelector(
    (state: RootState) => state.user.isOrderExist
  );

  const currentUser = useSelector((state: RootState) => state.user.user);

 

  const handleGetOrderByCustomer = (customerId: number) => {
    getOrderByCustomer({ variables: { customerId } })
      .then(({ data }) => {
        dispatch(setOrders(data.getOrderByCustomer));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (currentUser.id) {
      handleGetOrderByCustomer(currentUser.id);
    }
  }, []);

  useEffect(() => {
    if (orders.length) {
      dispatch(setIsOrdersExist(true));
    } else {
      dispatch(setIsOrdersExist(false));
    }
  }, [orders]);

  const handleUpdateUser = (idUser: number | undefined, userData: IUser) => {
    updateUser({ variables: { userId: idUser, userData: userData } })
      .then(({ data }) => {
        dispatch(setUser(data.updateUser));
      })
      .catch((error) => {
        console.log("erreur => ", error);
      });
  };

  const submitUpdateUser = (e: any): void => {
    e.preventDefault();
    const regexPhone = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    if (phone) {
      if (regexPhone.test(phone)) {
        setIsPhoneError(false);
        const UserData: IUser = {
          firstname: firstname,
          lastname: lastname,
          phone: phone,
        };

        if (firstname && lastname && phone) {
          handleUpdateUser(userDataStore?.id, UserData);
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
  };

  return (
    <div className="container-sm">
      <main role="main" className="mainProfil">
        <div className="row justify-content-center mt-10">
          <div className="col-md-4 col-lg-3">
            <div className="card-profil p-4 rounded">
              <p className="mb-3 text-center mb-3">
                <strong>
                  Bonjour {userDataStore?.firstname} {userDataStore?.lastname}
                </strong>
              </p>
              <div className="row justify-content-center">
                <img
                  src="https://picsum.photos/200"
                  className="rounded-circle p-0 mb-1"
                  alt="avatar"
                />
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

          <div className="col-md-8">
            <div className="card-profil p-4 rounded">
              <h4 className="text-center">Mes commandes</h4>
              <hr />
              <div className="row overflow-auto">
                {!isOrderExist && (
                  <p className="text-center mt-4">
                    Vous n'avez pas passé de commande pour le moment
                  </p>
                )}
                {isOrderExist && (
                  <table className="table table-hover align-middle text-center">
                    {orders.map((order) => (
                     <OrderCard key={order.id} {...order}  /> 
                    ))}
                  </table>
                )}
              </div>
            {/*   <ul className="pagination justify-content-center mt-3">
                <li className="page-item activePagination d-flex">
                  <a href="" className="page-link mx-1">
                    1
                  </a>
                  <a href="" className="page-link mx-1">
                    2
                  </a>
                </li>
              </ul> */}
            </div>
          </div>

          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title className="fs-2">Suppression du compte</Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-4">
              Etes vous sûr de vouloir supprimer votre compte ?
            </Modal.Body>
            <Modal.Footer>
              <Button className="btnsecondary" onClick={handleClose}>
                Annuler
              </Button>
              <Button className="btnWild" onClick={handleClose}>
                Supprimer définitivement
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showUpdateUser} onHide={handleCloseUpdateUser} centered>
            <Modal.Header closeButton>
              <Modal.Title className="fs-2">Modification du compte</Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-4">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    className="fs-3"
                    type="text"
                    placeholder="Nom"
                    value={lastname}
                    onChange={(e) => {
                      setLastname(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control
                    className="fs-3"
                    type="text"
                    placeholder="Prénom"
                    value={firstname}
                    onChange={(e) => {
                      setFirstname(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Téléphone</Form.Label>
                  <Form.Control
                    className={
                      isPhoneError
                        ? "border border-2 border-danger fs-3"
                        : "fs-3"
                    }
                    type="text"
                    placeholder="0606060606"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                  {isPhoneError && (
                    <p style={{ color: "red" }}>{phoneErrorMessage}</p>
                  )}
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button className="btnsecondary" onClick={handleCloseUpdateUser}>
                Annuler
              </Button>
              <Button className="btnWild" onClick={submitUpdateUser}>
                Valider
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        <hr className="featurette-divider" />
      </main>
    </div>
  );
}

export default Profile;
