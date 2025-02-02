type PetType = {
  _id: string;
  name: string;
  active: boolean;
  description: string;
  image: string;
  createdAt?: string,
  updatedAt?: string
}

type PetTypeUpdate = Omit<PetType, '_id'>;

interface PetTypeState {
  name: string;
  active: boolean;
  description: string;
  imageURL:string;
  uploadedFile: File | null;
}

export type {
  PetType,
  PetTypeUpdate,
  PetTypeState
};