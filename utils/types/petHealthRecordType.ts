import { PetHealthRecordType, PetMedicalConditionStatusType } from './main';

export interface IHealthRecordData {
  _id: string;
  petProfile: any;
  notes: string;
  active: boolean;
  completed?: boolean;

  // pet vaccination
  recordType: PetHealthRecordType;
  vaccination?: any;
  dueDate?: any;

  // pet medication
  medication?: any;
  startDate?: string;
  endDate?: string;
  frequency?: string;

  // pet medical condition
  medicalCondition?: any;
  diagnosedDate?: string;
  status?: PetMedicalConditionStatusType;

  // pet weight record
  weight?: number;
  unit?: string;
  recordedAt?: string;
}