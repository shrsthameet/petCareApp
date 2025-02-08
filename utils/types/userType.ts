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

export interface UserPetProfile {
  _id: string;
  userId: string;
  petBreed: string;
  petType: string;
  name: string;
  gender: string;
  image: any;
  dateOfBirth: string;
  dateOfAdoption: string;
  isProfileComplete: boolean;
  active: boolean;
  isDeleted: boolean;
  step: number;
  totalStep: number;
  chipNumber: string;
  isSterilised: boolean;
  createdAt?: string;
  updatedAt?: string;
}