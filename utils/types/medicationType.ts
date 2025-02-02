import { IMedicalConditionResponseType, Nullable } from './main';

interface MedicationBase {
  name: string;
  description: string;
  dosage: string;
  relatedToMedicalCondition: boolean;
  medicationForm: string[];
  sideEffects: string;
  active: boolean;
}

interface MedicationInput extends MedicationBase {
  medicalCondition?: Nullable<string>;
}

interface MedicationDataResponse extends MedicationBase {
  _id: string;
  medicalCondition?: IMedicalConditionResponseType;
  createdAt: string;
  updatedAt: string;
}

export type {
  MedicationInput,
  MedicationDataResponse,
};