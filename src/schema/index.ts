import 'graphql-import-node';
import typeDefs from './schema.graphql';
import resolvers from './../resolves';
import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';

const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
    
});

export default schema;