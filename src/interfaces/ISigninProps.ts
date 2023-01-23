export default interface ISigninProps {
  handleRegister: (lastName: string, firstName: string, email: string, phone: string, password: string, passwordConfirm: string) => void;
}