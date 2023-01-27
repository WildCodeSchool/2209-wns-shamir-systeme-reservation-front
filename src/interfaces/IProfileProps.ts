import IUser from "./IUser";

export default interface IProfileProps {
    infoUser: IUser;
    handleUpdateUser: (userId: number | undefined, userData: IUser) => void;
  }