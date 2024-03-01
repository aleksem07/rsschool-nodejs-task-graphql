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

export const MemberTypesType: GraphQLObjectType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: { type: MemberTypeId },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    profiles: {
      type: ProfilesType,
      resolve: async ({ id }: IMember) =>
        await prisma.profile.findMany({ where: { memberTypeId: id } }),
    },
  }),
});

const MemberTypeId = new GraphQLEnumType({
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

export const MemberTypeIdNonNull = new GraphQLNonNull(MemberTypeId);

export const MembersTypesType = new GraphQLList(MemberTypesType);

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: ProfileType,
      resolve: async ({ id }: IUser) =>
        await prisma.profile.findFirst({ where: { userId: id } }),
    },
  }),
});

export const UsersType = new GraphQLList(UserType);

export const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
    author: {
      type: UserType,
      resolve: async ({ authorId }: IPost) =>
        await prisma.user.findFirst({ where: { id: authorId } }),
    },
  }),
});

export const PostsType = new GraphQLList(PostType);

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    user: {
      type: UserType,
      resolve: async ({ userId }: IProfile) =>
        prisma.user.findFirst({ where: { id: userId } }),
    },
    memberTypeId: { type: MemberTypeId },
    memberType: {
      type: MemberTypesType,
      resolve: async ({ memberTypeId }: IProfile) =>
        await prisma.memberType.findFirst({ where: { id: memberTypeId } }),
    },
  }),
});

export const ProfilesType = new GraphQLList(ProfileType);
