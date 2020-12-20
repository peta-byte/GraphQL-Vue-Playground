const { typeDefinitions } = require('./typeDefinitions');
const { resolvers } = require('./resolvers');
const { ApolloServer } = require('apollo-server');

const serverPort = process.env.PORT || 3000;

// set playground to 'true' to test queries & mutations from http://localhost:3000/graphql
const server = new ApolloServer({ typeDefs: typeDefinitions, resolvers, playground: false });
const graphqlPath = server.graphqlPath;

server.listen(serverPort).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

