export interface UserLoginCredentials {
  email: string;
  password: string;
}

export type RoleType = 'admin' | 'user' | 'guest';

export interface User{
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