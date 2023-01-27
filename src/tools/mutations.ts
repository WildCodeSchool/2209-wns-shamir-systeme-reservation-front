import { gql } from "@apollo/client";

export const GET_TOKEN = gql`
mutation GetToken($password: String!, $email: String!) {
  getToken(password: $password, email: $email)
}
`;

export const CREATE_USER = gql`
mutation CreateUser($firstname: String!, $lastname: String!, $phone: String!, $email: String!, $password: String!, $passwordConfirm: String!) {
  createUser(firstname: $firstname, lastname: $lastname, phone: $phone, email: $email, password: $password, passwordConfirm: $passwordConfirm)
}
`;

export const UPDATE_USER = gql`
mutation Mutation($userId: Float!, $userData: userType!) {
  updateUser(userId: $userId, userData: $userData) {
    firstname
    id
    lastname
    phone
    email
  }
}
`;
