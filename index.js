const { ApolloServer, gql } = require('apollo-server');
const { makeExecutableSchema } = require('@graphql-tools/schema')

const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

const server = new ApolloServer({ schema});


server.listen().then(({ url }) => {
    console.log(`Server is listenning in ${url}`);
});
