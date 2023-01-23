import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Authentification.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Alert from "../../components/Alert/Alert";

type LoginProps = {
  LoadToken: (loginData: any) => Promise<any>;
  errorSign: string;
};

const SignIn = ({ LoadToken, errorSign }: LoginProps) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // si token (donc connecté) on redirige vers la home
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  });

  return (
    <div className="container signIn">
      <div className="row justify-content-center my-5">
        <h1 className="text-center mb-3">Connexion</h1>
        <div className="col-10">
          <Link className="text-dark RetourProfil text-decoration-none" to="/">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="fas fa-chevron-left me-3 iconRetourProfil"
            />
            Retour
          </Link>
        </div>
      </div>
      <form
        className="row justify-content-center"
        onSubmit={async (e) => {
          e.preventDefault();
          LoadToken({
            variables: {
              email: username,
              password: password,
            },
          });
        }}
      >
        <div className="col-6">
          <label className="label mb-2">Identifiant</label>
          <input
            className="form-control mb-5 fs-4"
            placeholder="email"
            type="text"
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <label className="label mb-2">Mot de passe</label>
          <input
            className="form-control mb-5 fs-4"
            type="password"
            value={password}
            placeholder="mot de passe"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {errorSign ? <Alert /> : ""}
        </div>
        <div className="col-12 text-center">
          <Button className="btnWild mt-3" type="submit">
            Valider
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
