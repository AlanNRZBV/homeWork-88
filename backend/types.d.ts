import { Model, Schema, Types } from 'mongoose';

export interface ThreadData {
  title: string,
  description: string,
  image: string | null
}
export interface CommentData {
  threadId: Types.ObjectId,
  userId: Types.ObjectId,
  content: string
}


export interface UserFields {
  username: string;
  password: string;
  token: string;
}

interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}


type UserModel = Model<UserFields, unknown, UserMethods>;

