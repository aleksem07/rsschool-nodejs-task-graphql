import { GraphQLBoolean, GraphQLObjectType } from 'graphql';
import { postType, profileType, userType } from '../types/queries.js';
import {
  postChangeInputType,
  profileChangeInputType,
  userChangeInputType,
  postCreateInputType,
  profileCreateInputType,
  userCreateInputType,
} from '../types/mutations.js';
import {
  IPostChange,
  IProfileChange,
  IUserChange,
  IPostCreate,
  IProfileCreate,
  IUserCreate,
  IPost,
  IProfile,
  IUser,
  IUserSubscribe,
} from '../interfaces/interfaces.js';
import prisma from '../prisma/prisma.js';
import { UUIDType } from '../types/uuid.js';

export const schemaMutations = new GraphQLObjectType({
  name: 'schemaMutations',

  fields: () => ({
    createPost: {
      type: postType,
      args: { dto: { type: postCreateInputType } },
      resolve: async (_parent, args: IPostCreate) => {
        try {
          return await prisma.post.create({ data: args.dto });
        } catch (err) {
          return err;
        }
      },
    },

    changePost: {
      type: postType,
      args: { id: { type: UUIDType }, dto: { type: postChangeInputType } },
      resolve: async (_parent, args: IPostChange) => {
        try {
          return await prisma.post.update({ where: { id: args.id }, data: args.dto });
        } catch (err) {
          return err;
        }
      },
    },

    deletePost: {
      type: GraphQLBoolean,
      args: { id: { type: UUIDType } },
      resolve: async (_parent, args: IPost) => {
        try {
          await prisma.post.delete({ where: { id: args.id } });
        } catch (err) {
          return false;
        }

        return true;
      },
    },

    createProfile: {
      type: profileType,
      args: { dto: { type: profileCreateInputType } },
      resolve: async (_parent, args: IProfileCreate) => {
        try {
          return await prisma.profile.create({ data: args.dto });
        } catch (err) {
          return err;
        }
      },
    },

    changeProfile: {
      type: profileType,
      args: { id: { type: UUIDType }, dto: { type: profileChangeInputType } },
      resolve: async (_parent, args: IProfileChange) => {
        try {
          return await prisma.profile.update({ where: { id: args.id }, data: args.dto });
        } catch (err) {
          return err;
        }
      },
    },

    deleteProfile: {
      type: GraphQLBoolean,
      args: { id: { type: UUIDType } },
      resolve: async (_parent, args: IProfile) => {
        try {
          await prisma.profile.delete({ where: { id: args.id } });
        } catch (err) {
          return false;
        }

        return true;
      },
    },

    createUser: {
      type: userType,
      args: { dto: { type: userCreateInputType } },
      resolve: async (_parent, args: IUserCreate) => {
        try {
          return await prisma.user.create({ data: args.dto });
        } catch (err) {
          return err;
        }
      },
    },

    changeUser: {
      type: userType,
      args: { id: { type: UUIDType }, dto: { type: userChangeInputType } },
      resolve: async (_parent, args: IUserChange) => {
        try {
          return await prisma.user.update({ where: { id: args.id }, data: args.dto });
        } catch (err) {
          return err;
        }
      },
    },

    deleteUser: {
      type: GraphQLBoolean,
      args: { id: { type: UUIDType } },
      resolve: async (_parent, args: IUser) => {
        try {
          await prisma.user.delete({ where: { id: args.id } });
        } catch (err) {
          return false;
        }

        return true;
      },
    },

    subscribeTo: {
      type: userType,
      args: { userId: { type: UUIDType }, authorId: { type: UUIDType } },
      resolve: async (_parent, args: IUserSubscribe) => {
        try {
          await prisma.subscribersOnAuthors.create({
            data: { subscriberId: args.userId, authorId: args.authorId },
          });

          return await prisma.user.findFirst({ where: { id: args.userId } });
        } catch {
          return false;
        }
      },
    },

    unsubscribeFrom: {
      type: GraphQLBoolean,
      args: { userId: { type: UUIDType }, authorId: { type: UUIDType } },
      resolve: async (_parent, args: IUserSubscribe) => {
        try {
          await prisma.subscribersOnAuthors.deleteMany({
            where: { subscriberId: args.userId, authorId: args.authorId },
          });
        } catch {
          return false;
        }

        return true;
      },
    },
  }),
});
