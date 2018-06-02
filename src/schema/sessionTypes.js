export default `
  type Session {
    _id: String!
    name: String!
    sessioncreator: ID!
    privacy: Boolean!
    participants: [User]!
    createdAt: Date!
  }

  scalar Date

  type SessionResponse {
    session: Session
    error: String
  }

  type Query {
    currentSession(id: ID!): Session!
    getAllSession: [Session!]!
  }

  type Mutation {
    createSession(sessioncreator: ID!, participants: ID!, name: String, privacy: Boolean): Session!
    joinSession(_id: ID!, userId: String!): SessionResponse!
    leaveSession(_id: ID!, userId: String!): SessionResponse!
    removeSession(_id: ID!): String
  }
`;
