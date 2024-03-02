import { GraphQLObjectType } from 'graphql';
import {
  memberTypeIdNotNull,
  memberType,
  membersType,
  postType,
  postsType,
  profileType,
  profilesType,
  userType,
  usersType,
} from '../types/queries.js';
import { UUIDType, UUIDTypeNonNull } from '../types/uuid.js';
import prisma from '../prisma/prisma.js';
import { IUser, IPost, IProfile, IMember } from '../interfaces/interfaces.js';

export const schemaQuery = new GraphQLObjectType({
  name: 'schemaQuery',
  fields: {
    user: {
      type: userType,
      args: { id: { type: UUIDType } },
      resolve: async (_parent, args: IUser) =>
        await prisma.user.findUnique({ where: { id: args.id } }),
    },
    users: {
      type: usersType,
      resolve: async () => await prisma.user.findMany(),
    },
    post: {
      type: postType,
      args: { id: { type: UUIDTypeNonNull } },
      resolve: async (_parent, args: IPost) =>
        await prisma.post.findUnique({ where: { id: args.id } }),
    },
    posts: {
      type: postsType,
      resolve: async () => await prisma.post.findMany(),
    },
    profile: {
      type: profileType,
      args: { id: { type: UUIDType } },
      resolve: async (_parent, args: IProfile) =>
        await prisma.profile.findUnique({ where: { id: args.id } }),
    },
    profiles: {
      type: profilesType,
      resolve: async () => await prisma.profile.findMany(),
    },
    memberType: {
      type: memberType,
      args: {
        id: { type: memberTypeIdNotNull },
      },
      resolve: async (_parent, args: IMember) =>
        await prisma.memberType.findFirst({ where: { id: args.id } }),
    },
    memberTypes: {
      type: membersType,
      resolve: async () => await prisma.memberType.findMany(),
    },
  },
});
