import IUser from "./IUser";

export default interface IProfileProps {
    infoUser: IUser | undefined | null;
    handleUpdateUser: (userId: number | undefined, userData: IUser) => void;
  }