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
    book(_id: String!); User
    
    
  }
  type Mutation {
    deleteBook(bookId):Book
    saveBook(_id: String!, authors: String, description:String!,bookId:String!, image:String, link:String, title: String ): Book
    createUser(name: String!, email: String!, password: String!): TokenUser
    createUserNoToken(name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): TokenUser
  }
`;

module.exports = typeDefs;