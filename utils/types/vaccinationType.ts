import { IMedicalConditionResponseType, Nullable } from './main';

export type VaccineType = 'Core' | 'Non-Core';

interface VaccinationBase {
  name: string;
  description: string;
  recommendedAge: string;
  vaccinationType: string;
  boosterRequired: boolean;
  boosterInterval: string;
  relatedToMedicalCondition: boolean;
  active: boolean;
}

interface VaccinationInput extends VaccinationBase {
  medicalCondition?: Nullable<string>;
}

interface VaccinationResponse extends VaccinationBase {
  _id: string;
  medicalCondition?: IMedicalConditionResponseType;
  createdAt: string;
  updatedAt: string;
}

export type {
  VaccinationInput,
  VaccinationResponse,
};