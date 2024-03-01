import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';
import { UUIDType } from './uuid.js';

export const MemberTypesType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: { type: UUIDType },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
  }),
});

export const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLString },
  }),
});

export const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UserType.getFields().id.type },
  }),
});

export const ProfileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UserType.getFields().id.type },
    memberTypeId: { type: PostType.getFields().id.type },
  }),
});
