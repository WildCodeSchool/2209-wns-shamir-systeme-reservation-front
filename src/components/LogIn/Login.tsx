import { useState } from "react";
import { Button, Nav } from "react-bootstrap";
import './login.css';

function Login({ handleLogin, loginError, setLoginError }: any) {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: any): void => {
    e.preventDefault();

    // Si l'email ou le mdp ne sont pas renseignés on affiche le message : ( Saisissez un mail et un mot de passe )
    if (!email || !password) {
      setLoginError(false);
      setErrorMessage(true);
    } else {
      // Dans le cas où ils sont renseignés, on utilise la fonction handleLogin pour se connecter.
      // Si les identifiants sont bons, on est logué.
      // Si les identifiants ne sont pas corrects, dans la function handleLogin on set la variable loginError à true pour afficher le message : (Les donées saisies ne sont pas correctes)
      setErrorMessage(false);
      handleLogin(email, password);
    }
  };
  return (
    <div className="login_container">
      <form className="login col-xl-2 col-lg-3 col-md-4 col-sm-10 col-11  shadow pt-5 pb-3 bg-white rounded"   onSubmit={handleSubmit}>
        <h4 className="d-flex justify-content-center col-9 m-auto mb-3 row text-center pt-3"><strong>Déjà client ?</strong></h4>
        <div className="col-9 m-auto mb-5 row">
          <label htmlFor="email">EMAIL</label>
          <input
            name="email"
            type="email"
            onChange={handleEmail}
            placeholder="Email"
          />
        </div>
        <div className="col-9 m-auto mb-5 row">
          <label htmlFor="password">MOT DE PASSE</label>
          <input
            name="password"
            type="password"
            onChange={handlePassword}
            placeholder="Mot de Passe"
          />
        </div>
        <div className="row justify-content-center">
          <Button className="btnWild" type="submit">
            Se connecter
          </Button>
        </div>
        { errorMessage && <p  className="col-9 m-auto mb-2 mt-4 row text-center" style={{color: "red"}}>Saisissez un mail et un mot de passe</p>}
        { loginError && <p className="col-9 m-auto mb-2 mt-4 row text-center" style={{color: "red"}}>Les donées saisies ne sont pas correctes</p>}    

        <hr style={{ width: "80%", margin: "0 auto" }} />
        <h4 className="d-flex justify-content-center col-9 m-auto mb-3 mt-3 row  text-center">
          <strong>Nouveau client ?</strong>
        </h4>
        <Nav>
         <div className="row m-auto">
            <Nav.Link href="/inscription">
              <Button className="btnWild" >
                Créer mon compte
              </Button>
            </Nav.Link>
          </div>
        </Nav>
      </form>
    </div>
  );
}

export default Login;
