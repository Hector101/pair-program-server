import { makeExecutableSchema } from 'graphql-tools';
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import sessionTypes from './sessionTypes';
import userTypes from './userTypes';

import sessionResolver from '../resolvers/sessionResolver';
import userResolver from '../resolvers/userResolver';

const types = mergeTypes([
  sessionTypes,
  userTypes
]);

const resolvers = mergeResolvers([
  sessionResolver,
  userResolver
]);

const schema = makeExecutableSchema({
  typeDefs: types,
  resolvers
});

export default schema;
