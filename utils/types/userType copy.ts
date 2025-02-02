import { Nullable } from './main';

type UserLoginCredentials = {
  email: string;
  password: string;
}

type RoleType = 'admin' | 'user' | 'guest';

// type UserRoles = {
//   id: string;
//   name: string;
//   created_at?: string;
//   updated_at?: string;
// }

type User = {
  _id: string;
  email: string;
  fullName: string;
  roles: RoleType[];
  token: string;
  created_at?: string;
  updated_at?: string;
  email_verified_at?: Nullable<string>;
}

// type AuthenticatedUserCredentials = {
//   token: string;
//   user: User;
// }

export type {
  UserLoginCredentials,
  User,
  RoleType
};