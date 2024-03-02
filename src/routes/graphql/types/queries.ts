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

export const memberTypeId = new GraphQLEnumType({
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

export const memberType: GraphQLObjectType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: { type: memberTypeId },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    profiles: {
      type: profilesType,
      resolve: async (args: IMember) => {
        try {
          return await prisma.profile.findMany({ where: { memberTypeId: args.id } });
        } catch (err) {
          return err;
        }
      },
    },
  }),
});

export const memberTypeIdNotNull = new GraphQLNonNull(memberTypeId);

export const membersType = new GraphQLList(memberType);

export const userType: GraphQLObjectType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: profileType,
      resolve: async (args: IUser) => {
        try {
          return await prisma.profile.findFirst({ where: { userId: args.id } });
        } catch (err) {
          return err;
        }
      },
    },

    posts: {
      type: postsType,
      resolve: async (args: IUser) => {
        try {
          return await prisma.post.findMany({ where: { authorId: args.id } });
        } catch (err) {
          return err;
        }
      },
    },

    userSubscribedTo: {
      type: usersType,
      resolve: async (args: IUser) => {
        try {
          const results = await prisma.subscribersOnAuthors.findMany({
            where: { subscriberId: args.id },
            select: { author: true },
          });

          return results.map((result) => result.author);
        } catch (err) {
          return err;
        }
      },
    },

    subscribedToUser: {
      type: usersType,
      resolve: async (args: IUser) => {
        try {
          const results = await prisma.subscribersOnAuthors.findMany({
            where: { authorId: args.id },
            select: { subscriber: true },
          });

          return results.map((result) => result.subscriber);
        } catch (err) {
          return err;
        }
      },
    },
  }),
});

export const usersType = new GraphQLList(userType);

export const postType: GraphQLObjectType = new GraphQLObjectType({
  name: 'PostType',
  fields: () => ({
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
    author: {
      type: userType,
      resolve: async (args: IPost) => {
        try {
          return await prisma.user.findFirst({ where: { id: args.authorId } });
        } catch (err) {
          return err;
        }
      },
    },
  }),
});

export const postsType = new GraphQLList(postType);

export const profileType: GraphQLObjectType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    user: {
      type: userType,
      resolve: async (args: IProfile) => {
        try {
          return await prisma.user.findFirst({ where: { id: args.userId } });
        } catch (err) {
          return err;
        }
      },
    },
    memberTypeId: { type: memberTypeId },
    memberType: {
      type: memberType,
      resolve: async (args: IProfile) => {
        try {
          return await prisma.memberType.findFirst({ where: { id: args.memberTypeId } });
        } catch (err) {
          return err;
        }
      },
    },
  }),
});

export const profilesType = new GraphQLList(profileType);
