import { useState } from 'react';
import closeEye from "../../assets/images/closeEye.png";
import openEye from "../../assets/images/openEye.png";
import info from "../../assets/images/info.svg";

import './signin.css';
import ISigninProps from '../../interfaces/ISigninProps';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../tools/mutations';

function SignIn({ handleLogin }: ISigninProps) {

  const [lastname, setLastname] = useState<string>('');
  const [isLastnameError, setIsLastnameError] = useState<boolean>(false);
  const [firstname, setFirstname] = useState<string>('');
  const [isFirstnameError, setIsFirstnameError] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>('');
  const [isPhoneError, setIsPhoneError] = useState<boolean>(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState<boolean>(false);
  const [isPasswordConfirmError, setIsPasswordConfirmError] = useState<boolean>(false);
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] = useState<string>('');

  const [createUser] = useMutation(CREATE_USER);
  const [isEmailAlreadyExist, setIsEmailAlreadyExist] = useState<boolean>(false);

  const navigate = useNavigate();

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
        handleLogin(email, password)
        setIsEmailAlreadyExist(false);
        navigate('/')
      })
      .catch((error) => {
        console.log(error);
        setIsEmailAlreadyExist(true);
      });
  };

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  }

  const handleShowPasswordConfirm = () => {
    setIsShowPasswordConfirm(!isShowPasswordConfirm);
  }

  const handleLastname = (e: any) => {
    setLastname(e.target.value);
  }

  const handleFirstname = (e: any) => {
    setFirstname(e.target.value);
  }

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  }
  const handlePhone = (e: any) => {
    setPhone(e.target.value);
  }

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  }

  const handlePasswordConfirm = (e: any) => {
    setPasswordConfirm(e.target.value);
  }


  const handleSubmit = (e: any): void => {
    e.preventDefault();

    // Regex pour le mot de passe : Minimum 12 caracteres, minimum une lettre maj. , minimum une lettre min. , minimum un chiffre, minimum un caractere special    
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/;
    //Regex pour le telephone : tous les numeros français 
    const regexPhone = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;

    // Conditions pour savoir si les differents champs du formulaire ont bien été saisis.
    // Si c'est le cas on retorne true
    // Sinon on returne false et on affiche un message d'erreur dans le champ manquant
    let lastnameDone = lastname ? (setIsLastnameError(false), true) : (setIsLastnameError(true), false);
    let firstnameDone = firstname ? (setIsFirstnameError(false), true) : (setIsFirstnameError(true), false);
    let emailDone = email ? (setIsEmailError(false), true) : (setIsEmailError(true), false);
    let phoneDone = false;
    let passwordDone = false;
    let passwordConfirmDone = false;

    // On test le num de telephone avec regexPhone
    if (phone) {
      if (regexPhone.test(phone)) {
        phoneDone = true;
        setIsPhoneError(false);
      } else {
        setIsPhoneError(true);
        setPhoneErrorMessage("Votre numero de téléphone n'est pas correct");
      }
    } else {
      setIsPhoneError(true);
      setPhoneErrorMessage("Saisissez votre numéro de téléphone");
    }

    // On test le mdp  avec regexPassword
    if (password) {
      if (regexPassword.test(password)) {
        passwordDone = true;
        setIsPasswordError(false);
      } else {
        setIsPasswordError(true);
        setPasswordErrorMessage("Votre mot de passe n'est pas correct");
      }
    } else {
      setIsPasswordError(true);
      setPasswordErrorMessage("Saisissez votre mot de passe");
    }

    // On controle si la confirmation du mdp a bien été saisie et si le mdp est egale au deuxieme mdp
    if (passwordConfirm) {
      if (password === passwordConfirm) {
        passwordConfirmDone = true;
        setIsPasswordConfirmError(false);
      } else {
        setIsPasswordConfirmError(true);
        setPasswordConfirmErrorMessage("Les mots de passe ne correspondent pas");
      }
    } else {
      setIsPasswordConfirmError(true);
      setPasswordConfirmErrorMessage("Saisissez à nouveau votre mot de passe");
    }

    // Dans le cas on a pas d'erreur et tous les champs ont été replis on utilise la fonction handleRegister pour enregistrer le nouveau utilisateur
    if (lastnameDone && firstnameDone && emailDone && phoneDone && passwordDone && passwordConfirmDone) {
      handleRegister(lastname, firstname, email, phone, password, passwordConfirm);
    }
  }

  return (
    <div className="signin row">
      <h1 className='text-center'>INSCRIPTION</h1>
         <form className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-11 m-auto shadow ml-5 mb-5 bg-white rounded search_product_container" onSubmit={handleSubmit}>
   
      <div className=" RetourProfila">
          <Link className="text-dark RetourProfil text-decoration-none" to="/" >
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="fas fa-chevron-left me-3 iconRetourProfil"
            />
            Accueil
          </Link>
        </div>
        <div className="col-10 m-auto mb-5 row">
          <label htmlFor="lastname">NOM *</label>
          <input name="lastname" type="text" onChange={handleLastname} className={isLastnameError ? 'error form-control' : 'form-control'} />
          {isLastnameError && <p style={{ color: "red" }}>Saisissez votre nom</p>}
        </div>
        <div className="col-10 m-auto mb-5 row">
          <label htmlFor="firstname">PRENOM *</label>
          <input name="firstname" type="text" onChange={handleFirstname} className={isFirstnameError ? 'error form-control' : 'form-control'} />
          {isFirstnameError && <p style={{ color: "red" }}>Saisissez votre prenom</p>}
        </div>
        <div className="col-10 m-auto mb-5 row">
          <label htmlFor="email">EMAIL *</label>
          <input name="email" type="email" onChange={handleEmail} className={isEmailError ? 'error form-control' : 'form-control'} />
          {isEmailError && <p style={{ color: "red" }}>Saisissez votre adresse e-mail</p>}
          {isEmailAlreadyExist && <p style={{ color: "red" }}>Cette adresse mail est déjà enregistrée</p>}

        </div>
        <div className="col-10 m-auto mb-5 row">
          <label htmlFor="phone">TELEPHONE *</label>
          <input name="phone" type="text" onChange={handlePhone} className={isPhoneError ? 'error form-control' : 'form-control'} />
          {isPhoneError && <p style={{ color: "red" }}>{phoneErrorMessage}</p>}
        </div>
        <div className="col-10 m-auto mb-5 row">
          <label htmlFor="password" className='d-flex justify-content-start'>MOT DE PASSE * <img className="info_password ms-4" src={info} alt="closeEye" data-toggle="tooltip" data-placement="top" title="Minimum 12 caractères, minimum une lettre majuscule, une lettre minuscule, un chiffre et un caractere special" /></label>
          <input name="password" type={isShowPassword ? 'text' : 'password'} onChange={handlePassword} className={isPasswordError ? 'error form-control' : 'form-control'} />
          {!isShowPassword && <img className={isPasswordError ? ' eyeError ms-4' : 'eye ms-4'} src={closeEye} alt="closeEye" onClick={handleShowPassword} />}
          {isShowPassword && <img className={isPasswordError ? ' eyeError ms-4' : 'eye ms-4'} src={openEye} alt="openEye" onClick={handleShowPassword} />}
          {isPasswordError && <p style={{ color: "red" }}>{passwordErrorMessage}</p>}
        </div>
        <div className="col-10 m-auto mb-5 row">
          <label htmlFor="passwordConfirm">CONFIRMATION DU MOT DE PASSE *</label>
          <input name="passwordConfirm" type={isShowPasswordConfirm ? 'text' : 'password'} onChange={handlePasswordConfirm} className={isPasswordConfirmError ? 'error form-control' : 'form-control'} />
          {!isShowPasswordConfirm && <img className={isPasswordConfirmError ? ' eyeError ms-4' : 'eye ms-4'} src={closeEye} alt="closeEye" onClick={handleShowPasswordConfirm} />}
          {isShowPasswordConfirm && <img className={isPasswordConfirmError ? ' eyeError ms-4' : 'eye ms-4'} src={openEye} alt="openEye" onClick={handleShowPasswordConfirm} />}
          {isPasswordConfirmError && <p style={{ color: "red" }}>{passwordConfirmErrorMessage}</p>}
        </div>
        <div className="row"><button type="submit" className="btn btn-primary col-5 m-auto  mt-4" >S'inscrire</button></div>

      </form>
    </div>
  )
}

export default SignIn;