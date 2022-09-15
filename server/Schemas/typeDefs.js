const { gql } = require('apollo-server-express');

const typeDefs = gql`
 

  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: String!
    savedBooks: [Book]
    # no password field, need to keep passwords hidden
  }
  type TokenUser {
    token: ID!
    user: User
  }
  type Book {
    _id: ID!
    authors: String
    description: String!
    bookId: String!
    image: String
    link: String
    title: String
  }
  
  type Query {
   
    
    users: [User]
    user(_id: String!): User
    me: User
    books: [Book]
    book(_id: String!): User
    
    
  }
  type Mutation {
   
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(book: BookInput): User
    removeBook(bookId: String): User
  }
`;

module.exports = typeDefs;