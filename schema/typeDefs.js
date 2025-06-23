const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id:ID!
        name:String!
        email:String!
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
        addUser(name:String!, email:String!): User!
        addPost(title: String!, content: String!): Post!
        login(email:String!): AuthPayload!
    }
`;

module.exports = typeDefs;