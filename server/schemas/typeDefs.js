const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
  }
  type Auth {
    token: ID!
    user: User
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
    books: [Book]
    book(title: String!): Book
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
