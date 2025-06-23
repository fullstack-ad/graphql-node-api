const { gql } = require('apollo-server');

const typeDefs = gql`
    enum Role {
        USER
        ADMIN
    }

    type User {
        id:ID!
        name:String!
        email:String!
        role: Role!
        posts: [Post!]!
        createdAt: String!
        updatedAt: String!
    }
    
    type Post {
        id: ID!
        title: String!
        content: String!
        user: User!
        createdAt:String!
        updatedAt: String!
    }

    type AuthPayload {
        token: String!
        user: User!
    }
    
    type Query {
        users: [User!]!,
        user(id: ID!): User
        posts(limit:Int, offset: Int): [Post!]!
        post(id: ID!): Post
    }
    
    type Mutation {
        login(email:String!,password:String!): AuthPayload!
        addUser(name:String!, email:String!, password:String!, role:Role!): User!
        addPost(title: String!, content: String!): Post!
        getPassHashed(password:String!): String!
    }
`;

module.exports = typeDefs;