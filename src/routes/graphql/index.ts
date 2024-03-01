import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import { gqlSchema } from './schemas.js';
import depthLimit from 'graphql-depth-limit';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
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

      const parseQuery = parse(query);
      const errValidate = validate(gqlSchema, parseQuery, [depthLimit(5)]);

      if (errValidate?.length > 0) {
        return { data: '', errors: errValidate };
      }

      const { data, errors } = await graphql({
        schema: gqlSchema,
        source: query,
        variableValues: variables,
      });

      return { data, errors };
    },
  });
};

export default plugin;
