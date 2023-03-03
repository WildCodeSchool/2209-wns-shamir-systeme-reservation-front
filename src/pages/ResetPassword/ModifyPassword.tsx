
import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CHECK_TOKEN_RESET } from "../../graphql/queries";
import closeEye from "../../assets/images/closeEye.png";
import openEye from "../../assets/images/openEye.png";
import "./ResetPassword.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { MODIFY_PASSWORD } from "../../graphql/mutations";
import { Form } from "react-bootstrap";

function ModifyPassword() {
    const [userPassword, setUserPassword]                   = useState<string>("");
    const [userConfirmPassword, setUserConfirmPassword]     = useState<string>("");
    const [invalidToken, setInvalidToken]                   = useState<string>("");
    const [isShowPassword, setIsShowPassword]               = useState<boolean>(false);
    const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState<boolean>(false);
    const [errorReset, setError]                            = useState<string>("");
    const [messageSuccess, setMessageSuccess]               = useState<string>("");
    const [passwordError, setPasswordError]                 = useState<string>("");
    const [passwordConfirmError, setPasswordConfirmError]   = useState<string>("");
    const [passwordValid, setPasswordValid]                 = useState<boolean>(false);

    const tokenURL                                          = useParams()
    const navigate                                          = useNavigate();

    const [checkTokenReset]                                 = useLazyQuery(CHECK_TOKEN_RESET);
    const [modifyPassword]                                  = useMutation(MODIFY_PASSWORD);

    // check token in param url
    async function handleCheckParamToken(token: string) {
      checkTokenReset({ variables: { token } })
          .then(({ data }) => {
            // if tokenURL = reset_token of user 
            if(data.checkTokenResetPassword !== token){
              setInvalidToken(data.checkTokenResetPassword)
            }
          })
          .catch((error) => {
              console.log('====================================');
              console.log('error FRONT CHECK TOKEN ', error);
              console.log('====================================');
          });
    }

    // show or hidden password
    const handleShowPassword = () => {
      setIsShowPassword(!isShowPassword);
    };
    const handleShowPasswordConfirm = () => {
      setIsShowPasswordConfirm(!isShowPasswordConfirm);
    };

    // mutation for modify password
    const handleModifyPassword = (token: any, password: string, passwordConfirm: string ) => {
      modifyPassword({ variables: { token: token, password: password, passwordConfirm: passwordConfirm } })
      .then(({ data }) => {
          console.log('====================================');
          console.log('Le user data ', data);
          console.log('====================================');
          setMessageSuccess(data.modifyPassword);
          setTimeout(() => {
              const messageConfirmation = document.querySelector(".messageConfirmation");
              messageConfirmation?.classList.add("displayNone");
              navigate('/');
          }, 5000)
      })
      .catch((error) => {
          console.log('====================================');
          console.log('error dans front ', error);
          console.log('====================================');
          setError(error.message)
      });
    }

    // submit form
    const submitResetPassword = (e: any): void => {
      e.preventDefault();
      const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/;
      // check field password
      if (userPassword) {
        if (regexPassword.test(userPassword)) {
          setPasswordError("");
          setPasswordValid(true);
        } else {
          setPasswordValid(false);
          setPasswordError("Votre mot de passe n'est pas correct");
        }
      } else {
        setPasswordError("Saisissez votre mot de passe");
      }
      // check field passwordConfirm
      if (userConfirmPassword) {
        if (regexPassword.test(userConfirmPassword)) {
          setPasswordConfirmError("");
          setPasswordValid(true);
        } else {
          setPasswordValid(false);
          setPasswordConfirmError("Votre mot de passe n'est pas correct");
        }
      } else {
        setPasswordConfirmError("Saisissez votre mot de passe");
      }

      if(passwordValid){
        handleModifyPassword(tokenURL.token, userPassword, userConfirmPassword);
        e.target.reset();
      }

    }

    useEffect(() => {
      if (tokenURL.token) {
        handleCheckParamToken(tokenURL.token);
      }
    }, []);

  return (
    <div className="container-sm">
      <main role="main" className="mainProfil">
        {invalidToken.length === 0 ? 
        <div className="row justify-content-center mt-10">
            <h1 className="text-center titleResetPassword mb-5">Modification du mot de passe</h1>
            <h3 className="text-center fs-1 messageConfirmation text-success my-4">{messageSuccess}</h3>
          <div className="col-md-6">
            <p className="mb-5">Veuillez saisir votre nouveau mot de passe.</p>
            <form onSubmit={submitResetPassword}>
                <div className="row position-relative">
                  <label className="label">Votre nouveau mot de passe</label>
                  <input
                      placeholder="mot de passe"
                      className="form-control p-2 fs-4"
                      type={isShowPassword ? "text" : "password"}
                      onChange={(e) => {
                        setUserPassword(e.target.value);
                      }}
                  />
                  {!isShowPassword ? (
                    <img
                      className={passwordError ? "eye ms-4 bottom" : "eye ms-4"}
                      src={closeEye}
                      alt="closeEye"
                      onClick={handleShowPassword}
                    />
                    ) : (
                      <img
                      className={passwordError ? "eyeError ms-4 bottom" : "eyeError ms-4"}
                      src={openEye}
                      alt="openEye"
                      onClick={handleShowPassword}
                      />
                  )}
                  {passwordError && (
                    <Form.Text className="text-danger">{passwordError}</Form.Text>
                  )}
                </div>
                <div className="row position-relative mt-4">
                  <label className="label">Confirmation du nouveau mot de passe</label>
                  <input
                      placeholder="mot de passe"
                      className="form-control p-2 fs-4"
                      type={isShowPasswordConfirm ? "text" : "password"}
                      onChange={(e) => {
                        setUserConfirmPassword(e.target.value);
                      }}
                  />
                  {!isShowPasswordConfirm ? (
                    <img
                      className={passwordConfirmError ? "eye2 ms-4 bottom" : "eye2 ms-4"}
                      src={closeEye}
                      alt="closeEye"
                      onClick={handleShowPasswordConfirm}
                    />
                  ) : (
                    <img
                      className={passwordConfirmError ? "eyeError2 ms-4 bottom" : "eyeError2 ms-4"}
                      src={openEye}
                      alt="openEye"
                      onClick={handleShowPasswordConfirm}
                    />
                  )}
                  {passwordConfirmError && (
                    <Form.Text className="text-danger">{passwordConfirmError}</Form.Text>
                  )}
                </div>
                <div className="row">
                    <button type="submit" className="btn btn-primary btnWild col-5 m-auto mt-4">
                        Valider
                    </button>
                </div>
            </form>
          </div>
        </div> 
        : 
        <div className="row justify-content-center mt-10">
          <h1 className="text-center titleResetPassword mb-5">{invalidToken}</h1>
          <Link className="text-dark RetourProfil text-decoration-none" to="/">
              <FontAwesomeIcon
              icon={faChevronLeft}
              className="fas fa-chevron-left me-3 iconRetourProfil"
              />
              Retour à l'accueil
          </Link>
        </div>
        }
      </main>
    </div>
  );
}

export default ModifyPassword;
