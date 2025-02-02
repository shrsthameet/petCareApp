type CommonPetBreedFields = {
  name: string;
  description: string;
  active: boolean;
  temperament: string;
  characteristics: string;
  origin: string;
  history: string;
  image: string;
  lifespan: {
    min: number;
    max: number;
  }
  createdAt?: string,
  updatedAt?: string
}

type PetBreed = {
  _id: string;
  petType: {
    _id: string;
    name: string;
  };
} & CommonPetBreedFields;

type PetBreedUpdate = {
  petType: string;
} & CommonPetBreedFields;

type Response = {
  success: boolean;
  message: {name: []};
  data: null;
}

export type {
  PetBreed,
  PetBreedUpdate,
  Response
};