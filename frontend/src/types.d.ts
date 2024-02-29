export interface Thread {
  _id:string,
  title: string,
  description: string | null,
  image: string | null,
  datetime: string
}

export interface ThreadsFetchResponse {
  message: string,
  threads: Thread[]
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
    }
  },

}
export interface GlobalError {
  error: string;
}
export interface RegisterResponse {
  message: string
  user: User
}