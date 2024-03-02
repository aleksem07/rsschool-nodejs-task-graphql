import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { IMember, IPost, IProfile, IUser } from '../interfaces/interfaces.js';
import prisma from '../prisma/prisma.js';

export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: {
      value: 'basic',
    },
    business: {
      value: 'business',
    },
  },
});

export const MemberType: GraphQLObjectType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: { type: MemberTypeId },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    profiles: {
      type: ProfilesType,
      resolve: async (args: IMember) => {
        await prisma.profile.findMany({ where: { memberTypeId: args.id } });
      },
    },
  }),
});

export const MemberTypeIdNotNull = new GraphQLNonNull(MemberTypeId);

export const MembersType = new GraphQLList(MemberType);

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: ProfileType,
      resolve: async (args: IUser) =>
        await prisma.profile.findFirst({ where: { userId: args.id } }),
    },

    posts: {
      type: PostsType,
      resolve: async (args: IUser) =>
        await prisma.post.findMany({ where: { authorId: args.id } }),
    },

    userSubscribedTo: {
      type: UsersType,
      resolve: async (args: IUser) => {
        const results = await prisma.subscribersOnAuthors.findMany({
          where: { subscriberId: args.id },
          select: { author: true },
        });

        return results.map((result) => result.author);
      },
    },

    subscribedToUser: {
      type: UsersType,
      resolve: async (args: IUser) => {
        const results = await prisma.subscribersOnAuthors.findMany({
          where: { authorId: args.id },
          select: { subscriber: true },
        });
        return results.map((result) => result.subscriber);
      },
    },
  }),
});

export const UsersType = new GraphQLList(UserType);

export const PostType: GraphQLObjectType = new GraphQLObjectType({
  name: 'PostType',
  fields: () => ({
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
    author: {
      type: UserType,
      resolve: async (args: IPost) =>
        await prisma.user.findFirst({ where: { id: args.authorId } }),
    },
  }),
});

export const PostsType = new GraphQLList(PostType);

export const ProfileType: GraphQLObjectType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    user: {
      type: UserType,
      resolve: async (args: IProfile) =>
        prisma.user.findFirst({ where: { id: args.userId } }),
    },
    memberTypeId: { type: MemberTypeId },
    memberType: {
      type: MemberType,
      resolve: async (args: IProfile) =>
        await prisma.memberType.findFirst({ where: { id: args.memberTypeId } }),
    },
  }),
});

export const ProfilesType = new GraphQLList(ProfileType);
