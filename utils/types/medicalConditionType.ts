interface ApplicablePets {
  _id: string;
  name: string;
}

interface ApplicablBreeds {
  _id: string;
  name: string;
}

interface BaseMedicalCondition {
  name: string;
  description: string;
  symptoms: string;
  treatments: string;
  isContagious: string;
  active: boolean;
}

interface MedicalConditionInput extends BaseMedicalCondition {
  applicablePets: string[];
  applicableBreeds: string[];
}

interface MedicalConditionResponse extends BaseMedicalCondition {
  _id: string;
  applicablePets: ApplicablePets[];
  applicableBreeds: ApplicablBreeds[];
  createdAt: string;
  updatedAt: string;
}

export type {
  ApplicablePets,
  ApplicablBreeds,
  MedicalConditionInput,
  MedicalConditionResponse
};