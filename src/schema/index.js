import { makeExecutableSchema } from 'graphql-tools';

import sessionTypes from './sessionTypes';
import resolvers from '../resolvers/sessionResolver';

const schema = makeExecutableSchema({
  typeDefs: sessionTypes,
  resolvers
});

export default schema;
