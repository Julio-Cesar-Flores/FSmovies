import { gql, useQuery, useMutation, useLazyQuery } from '@apollo/client'

export const FIND_USER = gql`
  query findUser($usuario: String!, $password: String!) {
    findUser(usuario: $usuario, password: $password) {
      _id
      usuario
      password
      token
      dashboard
    }
  }
`
