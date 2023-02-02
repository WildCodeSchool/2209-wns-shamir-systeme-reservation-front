import IUser from "./IUser";

export default interface ISigninProps {
  handleLogin: (email: string, password: string) => Promise<void>
  // handleRegister: (lastName: string, firstName: string, email: string, phone: string, password: string, passwordConfirm: string) => void;
  // isEmailAlredyExist : boolean;
}