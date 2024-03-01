import { GraphQLObjectType } from 'graphql';
import { UserType } from '../types/queries.js';
import { UUIDType } from '../types/uuid.js';
import prisma from '../prisma/prisma.js';

interface User {
  id: string;
  name: string;
  balance: number;
}

export const schemaQuery = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    user: {
      type: UserType,
      args: {
        id: { type: UUIDType },
      },
      resolve: async (_parent, args: User) => {
        await prisma.user.findFirst({ where: { id: args.id } });
      },
    },
  }),
});
