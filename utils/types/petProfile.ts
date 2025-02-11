import { GenderValueType } from './main';

interface PetData  {
  _id: string;
  name: string;
}

interface PetProfileBase {
  _id: string;
  userId: string;
  name: string;
  gender: GenderValueType;
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

export interface UserPetProfile extends PetProfileBase {
  petBreed: string;
  petType: string;
}

export interface PetProfile extends PetProfileBase {
  petBreed: PetData;
  petType: PetData;
}