import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from 'react';
import { Link } from "react-router-dom";
import "./ResetPassword.css";
import { RESET_PASSWORD } from '../../graphql/mutations';
import { useMutation } from "@apollo/client";
import Swal from "sweetalert2";

function ResetPassword() {
    const [userEmail, setUserEmail] = useState<string>("");

    const [resetPassword] = useMutation(RESET_PASSWORD);

    const handleEmail = (email: string) => {
        resetPassword({ variables: { email: email } })
            .then(({ data }) => {
                Swal.fire({
                    title: data.resetPassword,
                    text: "",
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#0d83ab'
                })
            })
            .catch((error) => {
                console.log('====================================');
                console.log('error dans front ', error);
                console.log('====================================');
                Swal.fire({
                    title: error.message,
                    text: "",
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#DD6B55'
                })
            });
    };

    const submitEmail = (e: any): void => {
        e.preventDefault();
        handleEmail(userEmail);
        e.target.reset();
    }

    return (
        <div className="container-sm">
            <main role="main" className="mainProfil">
                <div className="row justify-content-center mt-10">
                    <h1 className="text-center titleResetPassword">Réinitialisation du mot de passe</h1>
                    <Link className="text-dark RetourProfil text-decoration-none" to="/">
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            className="fas fa-chevron-left me-3 iconRetourProfil"
                        />
                        Retour
                    </Link>
                    <div className="col-md-6">
                        <p className="mb-5">Veuillez saisir votre email de connexion afin de recevoir le lien de réinitialisation de votre mot de passe.</p>
                        <form onSubmit={submitEmail} className="form">
                            <label className="label">Votre email</label>
                            <input
                                placeholder="exemple@gmail.com"
                                className="form-control p-2 fs-4"
                                type="email"
                                onChange={(e) => {
                                    setUserEmail(e.target.value);
                                }}
                            />
                            <div className="row">
                                <button type="submit" className="btn btn-primary btnWild col-5 m-auto mt-4">
                                    Valider
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ResetPassword;
