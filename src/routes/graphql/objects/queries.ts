import { GraphQLObjectType } from 'graphql';
import {
  MemberTypesType,
  PostType,
  ProfileType,
  UserType,
  UsersType,
} from '../types/queries.js';
import { UUIDType } from '../types/uuid.js';
import prisma from '../prisma/prisma.js';
import { IUser, IPost, IProfile, IMember } from '../interfaces/interfaces.js';

export const schemaQuery = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    user: {
      type: UserType,
      args: {
        id: { type: UUIDType },
      },
      resolve: async (_parent, args: IUser) => {
        await prisma.user.findFirst({ where: { id: args.id } });
      },
    },

    users: {
      type: UsersType,
      resolve: async () => {
        await prisma.user.findMany();
      },
    },

    post: {
      type: PostType,
      args: {
        id: { type: UUIDType },
      },
      resolve: async (_parent, args: IPost) => {
        await prisma.post.findFirst({ where: { id: args.id } });
      },
    },

    posts: {
      type: PostType,
      resolve: async () => {
        await prisma.post.findMany();
      },
    },

    profile: {
      type: ProfileType,
      args: {
        id: { type: UUIDType },
      },
      resolve: async (_parent, args: IProfile) => {
        await prisma.user.findFirst({ where: { id: args.id } });
      },
    },

    profiles: {
      type: ProfileType,
      resolve: async () => {
        await prisma.profile.findMany();
      },
    },

    memberType: {
      type: MemberTypesType,
      args: {
        id: { type: UUIDType },
      },
      resolve: async (_parent, args: IMember) => {
        await prisma.memberType.findFirst({ where: { id: args.id } });
      },
    },

    memberTypes: {
      type: MemberTypesType,
      resolve: async () => {
        await prisma.memberType.findMany();
      },
    },
  }),
});