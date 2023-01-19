import { useState } from "react";
import './login.css';

function Login({handleLogin, loginError,  setLoginError}: any) {
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<boolean>(false);


  const handlePassword = (e: any) =>{
    setPassword(e.target.value);
  }

  const handleEmail = (e: any) =>{
    setEmail(e.target.value);
  }

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    
    if (!email || !password) {
      setLoginError(false);
      setErrorMessage(true);  
    }else{
      setErrorMessage(false);
      handleLogin(email,  password);
    }
  }

  return (
    <div>
     
      <form className=" login col-lg-2 col-md-3 col-sm-10 col-7  m-auto shadow pt-5 pb-5 bg-white rounded search_product_container " onSubmit={handleSubmit}>
        <h1 className="d-flex justify-content-center col-9 m-auto mb-5 row ">LOGIN</h1>
        <div className="col-9 m-auto mb-5 row">
          <label htmlFor="email">EMAIL</label>
          <input name="email" type="email" onChange={handleEmail} />
        </div>
        <div className="col-9 m-auto mb-5 row">
          <label htmlFor="password">MOT DE PASSE</label>
          <input name="password" type="password" onChange={handlePassword}/>
        </div>
        <div className="row"><button type="submit" className="btn btn-primary col-5 m-auto" >Se connecter</button></div>
        { errorMessage && <p  className="col-9 m-auto mb-2 mt-4 row text-center" style={{color: "red"}}>Saisissez un mail et un mot de passe</p>}
        { loginError && <p className="col-9 m-auto mb-2 mt-4 row text-center" style={{color: "red"}}>Les donées saisies ne sont pas correctes</p>}    
      </form>
    </div>

  )
}

export default Login;