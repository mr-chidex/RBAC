import { Schema } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  password: string;
  addedBy?: Schema.Types.ObjectId;
}

export interface IBlog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  author: Schema.Types.ObjectId;
}

export interface ILogin {
  email: string;
  password: string;
}
