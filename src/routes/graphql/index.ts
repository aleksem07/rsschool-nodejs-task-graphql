import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, GraphQLSchema, GraphQLObjectType, GraphQLList } from 'graphql';
import { MemberTypesType, PostType, UserType, ProfileType } from './types/queries.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const prisma = fastify.prisma;

  const schemaQuery = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: {
        mewmberTypes: {
          type: new GraphQLList(MemberTypesType),
          resolve: () => prisma.memberType.findMany(),
        },
        posts: { type: new GraphQLList(PostType), resolve: () => prisma.post.findMany() },
        users: { type: new GraphQLList(UserType), resolve: () => prisma.user.findMany() },
        profiles: {
          type: new GraphQLList(ProfileType),
          resolve: () => prisma.profile.findMany(),
        },
      },
    }),
  });

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },

    async handler(req) {
      const { query, variables } = req.body;

      return graphql({ schema: schemaQuery, source: query, variableValues: variables });
    },
  });
};

export default plugin;
