const { ApolloServer, gql } = require('apollo-server');
const { makeExecutableSchema } = require('@graphql-tools/schema')

const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
const { verifyToken } = require('./utils/auth');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

const server = new ApolloServer({
    schema, context: ({ req }) => {
        const token = req.headers.authorization || '';
        const user = verifyToken(token.replace('Bearer ', ''));

        return { user };
    }
});


server.listen().then(({ url }) => {
    console.log(`Server is listenning in ${url}`);
});
