import { gql } from "@apollo/client";

const GET_TOKEN = gql`
  mutation Mutation($password: String!, $email: String!) {
    getToken(password: $password, email: $email)
  }
`;

export { GET_TOKEN };
