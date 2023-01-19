import { gql } from "@apollo/client";

const GET_TOKEN = gql`
mutation GetToken($password: String!, $email: String!) {
  getToken(password: $password, email: $email)
}
`;


export default GET_TOKEN;
