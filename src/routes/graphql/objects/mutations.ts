import { GraphQLBoolean, GraphQLObjectType } from 'graphql';
import { PostType, ProfileType, UserType } from '../types/queries.js';
import {
  ChangePostInputType,
  ChangeProfileInputType,
  ChangeUserInputType,
  CreatePostInputType,
  CreateProfileInputType,
  CreateUserInputType,
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
      type: PostType,
      args: { dto: { type: CreatePostInputType } },
      resolve: async (_parent, args: IPostCreate) =>
        await prisma.post.create({ data: args.dto }),
    },

    changePost: {
      type: PostType,
      args: { id: { type: UUIDType }, dto: { type: ChangePostInputType } },
      resolve: async (_parent, args: IPostChange) =>
        await prisma.post.update({ where: { id: args.id }, data: args.dto }),
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
      type: ProfileType,
      args: { dto: { type: CreateProfileInputType } },
      resolve: async (_parent, args: IProfileCreate) =>
        await prisma.profile.create({ data: args.dto }),
    },

    changeProfile: {
      type: ProfileType,
      args: { id: { type: UUIDType }, dto: { type: ChangeProfileInputType } },
      resolve: async (_parent, args: IProfileChange) =>
        await prisma.profile.update({ where: { id: args.id }, data: args.dto }),
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
      type: UserType,
      args: { dto: { type: CreateUserInputType } },
      resolve: async (_parent, args: IUserCreate) =>
        await prisma.user.create({ data: args.dto }),
    },

    changeUser: {
      type: UserType,
      args: { id: { type: UUIDType }, dto: { type: ChangeUserInputType } },
      resolve: async (_parent, args: IUserChange) =>
        await prisma.user.update({ where: { id: args.id }, data: args.dto }),
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
      type: UserType,
      args: { userId: { type: UUIDType }, authorId: { type: UUIDType } },
      resolve: async (_parent, args: IUserSubscribe) => {
        await prisma.subscribersOnAuthors.create({
          data: { subscriberId: args.userId, authorId: args.authorId },
        });

        return await prisma.user.findFirst({ where: { id: args.userId } });
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
