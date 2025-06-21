const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id:ID!
        name:String!
        email:String!
        posts: [Post!]!
    }
    
    type Post {
        id: ID!
        title: String!
        content: String!
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
        addPost(userId: ID!, title: String!, content: String!): Post!
    }
`;

module.exports = typeDefs;