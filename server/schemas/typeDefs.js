const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
  }

  type Book {
    bookId: ID
    authors: String!
    title: String
    description: String
    image: String!
    link: String
  }
  type Query {
    # Path: The return
    users: [User]
    user(username: String!): User
  }
  type Mutation {
    login(email: String!, password: String!): User
    addUser(username: String!, email: String!, password: String!): User
  }
`;

module.exports = typeDefs;
