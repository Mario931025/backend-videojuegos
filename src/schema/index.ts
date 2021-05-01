import 'graphql-import-node';
import resolvers from './../resolves';
import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';

import {loadFilesSync } from'@graphql-tools/load-files';
//mezcla los titpos de definiciónes 
import {mergeTypeDefs} from'@graphql-tools/merge';


const loadedFiles = loadFilesSync(`${__dirname}/**/*.graphql`);
const typeDefs = mergeTypeDefs(loadedFiles);




const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
    
});

export default schema;