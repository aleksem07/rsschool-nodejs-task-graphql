export interface IUser {
  id: string;
  name: string;
  balance: number;
}

export interface IUserSubscribe {
  userId: string;
  authorId: string;
}

export interface IUserCreate {
  dto: {
    name: string;
    balance: number;
  };
}

export interface IUserChange {
  id: string;
  dto: {
    name: string;
    balance: number;
  };
}

export interface IPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
}

export interface IPostCreate {
  dto: {
    authorId: string;
    title: string;
    content: string;
  };
}

export interface IPostChange {
  id: string;
  dto: {
    authorId: string;
    title: string;
    content: string;
  };
}

export interface IProfile {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: string;
}

export interface IProfileCreate {
  dto: {
    userId: string;
    memberTypeId: string;
    isMale: boolean;
    yearOfBirth: number;
  };
}

export interface IProfileChange {
  id: string;
  dto: {
    memberTypeId: string;
    isMale: boolean;
    yearOfBirth: number;
  };
}

export interface IMember {
  id: string;
  discount: number;
  postsLimitPerMonth: number;
}
