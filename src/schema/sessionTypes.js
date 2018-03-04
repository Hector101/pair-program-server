export default `
  type Session {
    _id: String!
    name: String!
    participants: [String!]
  }

  type Query {
    currentSession(id: String!): Session!
    getAllSession: [Session!]
  }

  type Mutation {
    createSession(participants: [String!], name: String!): Session!
    joinSession(id: String!, name: String!): Session!
    leaveSession(id: String, name: String!): Session
    removeSession(id: String!): String!
  }
`;
