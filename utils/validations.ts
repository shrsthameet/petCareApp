import { z } from 'zod';

export const PetTypeAndBreedSchema = z.object({
  selectedPetType: z.string().nonempty({
    message: 'Pet type is required.',
  }),
  selectedPetBreed: z.string().nonempty({
    message: 'Pet breed is required.',
  }),
});

export const PetBioFormSchema = z.object({
  name: z.string().nonempty({
    message: 'Name is required.',
  }),
  gender: z.string().nonempty({
    message: 'Gender is required.',
  }),
  dateOfBirth: z.string().optional(),
  adoption: z.string(),
  dateOfAdoption: z.string().optional(),
  image: z.any().optional(),
});

export const PetInfoFormSchema = z.object({
  chipNumber: z.string().optional(),
  isSterilised: z.boolean(),
  step: z.number().optional()
});