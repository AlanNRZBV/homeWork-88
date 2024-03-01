interface Username {
  username: string;
}
interface Title {
  title: string;
}
export interface Thread {
  _id: string;
  userId: username;
  title: string;
  description: string | null;
  image: string | null;
  datetime: string;
}

export interface ThreadMutation {
  title: string;
  description: string | null;
  image: File | null;
}

export interface ThreadsFetchResponse {
  message: string;
  threads: Thread[];
}
export interface SingleThreadFetchResponse {
  message: string;
  thread: Thread;
}

export interface IComment {
  _id?: string;
  userId: Username;
  threadId?: Title;
  content: string;
  datetime: string;
}

export interface ICommentMutation {
  threadId: string;
  content: string;
}

export interface CommentsFetchResponse {
  message: string;
  comments: IComment[];
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}
export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
}
export interface GlobalError {
  error: string;
}
export interface RegisterResponse {
  message: string;
  user: User;
}
