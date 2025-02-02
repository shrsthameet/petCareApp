import { AuthRoutes, PetProfileSetupRoutes, TabsRoutes } from '../enum';

export const API_VERSION = {
  V1: '/api/v1'
};

export const BASE_URL = `${process.env.EXPO_PUBLIC_API_URL}${API_VERSION.V1}`;
export const IMAGE_BASE_URL = `${process.env.EXPO_PUBLIC_API_URL}`;

export const API_ROUTES = {
  PET: {
    TYPE: '/petTypes',
    TYPE_ID: '/petTypes/:id',

    BREED: '/petBreeds',
    BREED_ID: '/petBreeds/:id',

    PROFILE: '/petProfiles',
    PROFILE_ID: '/petProfiles/:id'
  },

  HEALTH: {
    MEDICAL_CONDITIONS: '/medicalConditions',
    MEDICAL_CONDITIONS_ID: '/medicalConditions/:id',
  
    VACCINATION: '/vaccinations',
    VACCINATION_ID: '/vaccinations/:id',

    MEDICATIONS: '/medications',
    MEDICATIONS_ID: '/medications/:id',
  },

  USER: {
    AllUSERS: '/users',
    USER_PET_PROFILES: '/users/:userId'
  },

  AUTH: {
    REGISTER: '/register',
    LOGIN: '/login',
    LOGOUT: '/logout'
  }
};

export const ROUTES = {
  AUTH: AuthRoutes,
  TABS_ROUTES: TabsRoutes,
  PET_PROFILE_SETUP: PetProfileSetupRoutes,
};


