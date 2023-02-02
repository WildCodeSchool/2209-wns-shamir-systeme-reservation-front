export default interface ISigninProps {
  handleLogin: (email: string, password: string) => Promise<void>
}