import { Alert } from "react-bootstrap";
type Flash = {type: string, message: string}

export const FlashMessage = ({type, message}: Flash) => {
  return (
    <Alert key={type} variant={type} className="text-center">
      {message}
    </Alert>
  );
};
