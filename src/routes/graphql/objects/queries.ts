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
      resolve: async (_parent, args: IUser) => {
        try {
          return await prisma.user.findUnique({ where: { id: args.id } });
        } catch (err) {
          return err;
        }
      },
    },

    users: {
      type: usersType,
      resolve: async () => {
        try {
          return await prisma.user.findMany();
        } catch (err) {
          return err;
        }
      },
    },

    post: {
      type: postType,
      args: { id: { type: UUIDTypeNonNull } },
      resolve: async (_parent, args: IPost) => {
        try {
          return await prisma.post.findUnique({ where: { id: args.id } });
        } catch (err) {
          return err;
        }
      },
    },

    posts: {
      type: postsType,
      resolve: async () => {
        try {
          return await prisma.post.findMany();
        } catch (err) {
          return err;
        }
      },
    },

    profile: {
      type: profileType,
      args: { id: { type: UUIDType } },
      resolve: async (_parent, args: IProfile) => {
        try {
          return await prisma.profile.findUnique({ where: { id: args.id } });
        } catch (err) {
          return err;
        }
      },
    },

    profiles: {
      type: profilesType,
      resolve: async () => {
        try {
          return await prisma.profile.findMany();
        } catch (err) {
          return err;
        }
      },
    },

    memberType: {
      type: memberType,
      args: {
        id: { type: memberTypeIdNotNull },
      },
      resolve: async (_parent, args: IMember) => {
        try {
          return await prisma.memberType.findUnique({ where: { id: args.id } });
        } catch (err) {
          return err;
        }
      },
    },

    memberTypes: {
      type: membersType,
      resolve: async () => {
        try {
          return await prisma.memberType.findMany();
        } catch (err) {
          return err;
        }
      },
    },
  },
});
