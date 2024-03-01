import { GraphQLObjectType } from 'graphql';
import {
  MemberTypeIdNonNull,
  MemberType,
  MembersType,
  PostType,
  PostsType,
  ProfileType,
  ProfilesType,
  UserType,
  UsersType,
} from '../types/queries.js';
import { UUIDType, UUIDTypeNonNull } from '../types/uuid.js';
import prisma from '../prisma/prisma.js';
import { IUser, IPost, IProfile, IMember } from '../interfaces/interfaces.js';

export const schemaQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: UUIDType } },
      resolve: async (_parent, args: IUser) =>
        await prisma.user.findUnique({ where: { id: args.id } }),
    },
    users: {
      type: UsersType,
      resolve: async () => await prisma.user.findMany(),
    },
    post: {
      type: PostType,
      args: { id: { type: UUIDTypeNonNull } },
      resolve: async (_parent, args: IPost) =>
        await prisma.post.findUnique({ where: { id: args.id } }),
    },
    posts: {
      type: PostsType,
      resolve: async () => await prisma.post.findMany(),
    },
    profile: {
      type: ProfileType,
      args: { id: { type: UUIDType } },
      resolve: async (_parent, args: IProfile) =>
        await prisma.profile.findUnique({ where: { id: args.id } }),
    },
    profiles: {
      type: ProfilesType,
      resolve: async () => await prisma.profile.findMany(),
    },
    memberType: {
      type: MemberType,
      args: {
        id: { type: MemberTypeIdNonNull },
      },
      resolve: async (_parent, args: IMember) =>
        await prisma.memberType.findFirst({ where: { id: args.id } }),
    },
    memberTypes: {
      type: MembersType,
      resolve: async () => await prisma.memberType.findMany(),
    },
  },
});
