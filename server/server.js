const { ApolloServer } = require('apollo-server');
const { typeDefinitions } = require('./typeDefinitions');
const { resolvers } = require('./resolvers');

const server = new ApolloServer({ typeDefs: typeDefinitions, resolvers });
const graphqlPath = server.graphqlPath;
let PORT;
let URL;

server.listen().then(({ url, port }) => {
  PORT = port;
  URL = url;
});
