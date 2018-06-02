export default `
  type User {
    _id: ID!
    fullName: String!
    email: String!
    imageUrl: String
  }

  type Error {
    message: String!
  }

  type UserResponse {
    user: User
    error: Error
    token: String
  }

  type Query {
    getUser(_id: ID!): UserResponse!
    getAllUsers: [User!]!
  }

  type Mutation {
    createUser(fullName: String!, email: String!, password: String!): UserResponse!
    updateUser(_id: ID!, fullName: String, email: String, imageUrl: String): UserResponse!
    updateEmail(_id: ID!, email: String): UserResponse!
    updatePassword(_id: ID!, password: String!): UserResponse!
    signinUser(email: String!, password: String!): UserResponse!
    deactivateUser(_id: ID!): User
    activateUser(_id: ID!): User
  }
`;
