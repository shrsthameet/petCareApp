type UserLoginCredentials = {
  email: string;
  password: string;
}

type RoleType = 'admin' | 'user' | 'guest';

type User = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: RoleType[];
  token: string;
  // created_at?: string;
  // updated_at?: string;
  // email_verified_at?: Nullable<string>;
}

export type {
  UserLoginCredentials,
  User,
  RoleType
};