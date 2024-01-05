import { Schema, model } from 'mongoose';

import { IUser, UserRole } from './model.interface';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
      required: true,
    },
    addedBy: {
      //details of the admin user that added a new user
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export const User = model<IUser>('User', userSchema);
