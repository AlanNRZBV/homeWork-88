import { Model, Schema } from 'mongoose';

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

interface ThreadFields {
  userId: Schema.Types.ObjectId;
  title: string;
  description: string;
  image?: string;
  datetime: string;
}