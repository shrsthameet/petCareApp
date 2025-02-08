import axios, { AxiosError } from 'axios';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { MMKV } from 'react-native-mmkv';
import { Alert } from 'react-native';
import { differenceInYears, differenceInMonths, parseISO } from 'date-fns';
import {
  AdoptionStatus, Gender, Shape, Size 
} from '../enum';
import { IOptionList, ShapeType, SizeType } from './main';
import { ITheme } from './themeType';

const storage = new MMKV();

export function returnErroMsg(error: any, rejectWithValue: any) {
  if (axios.isAxiosError(error)) {
    // Handle Axios-specific errors
    console.log('axios error', error);
    return rejectWithValue(error.response?.data.message || error.response?.data.error || 'An error occurred');
  } else {
    // Handle other types of errors
    return rejectWithValue('An unexpected error occurred');
  }
}

export function parseErrorMsg(errorType: any) {
  if (typeof errorType === 'string') {
    return errorType;
  } else if (errorType && typeof errorType === 'object' && 'message' in errorType) {
    return (errorType as AxiosError).message;
  } else {
    return 'An unknown error occurred';
  }
}

// Helper function to get the border radius based on the shape
export const getShapeStyle = (theme: ITheme, shape: ShapeType) => {
  switch (shape) {
  case Shape.Curve:
    return theme.borderRadius.curve; // square corners
  case Shape.Arch:
    return theme.borderRadius.arch; // square corners
  case Shape.Pill:
    return theme.borderRadius.pill; // rounded corners
  default:
    return theme.borderRadius.flat; // default to rounded
  }
};

export function getSize(theme: ITheme, size?: SizeType) {
  switch (size) {
  case Size.XSmall:
    return theme.spacing.xs;
  case Size.Small:
    return theme.spacing.sm;
  case Size.Medium:
    return theme.spacing.md;
  case Size.Large:
    return theme.spacing.lg;
  case Size.XLarge:
    return theme.spacing.xl;
  default:
    return theme.spacing.md;
  }
}

export function getFontSize(theme: ITheme, size?: SizeType) {
  switch (size) {
  case (Size.XSmall || Size.Small):
    return theme.typography.caption?.small.fontSize;
  case Size.Medium:
    return theme.typography.body?.medium.fontSize;
  case Size.Large:
    return theme.typography.body?.large.fontSize;
  default:
    return theme.typography.body?.medium.fontSize;
  }
}

export const isFetchBaseQueryError = (error: any): error is FetchBaseQueryError => {
  return error && typeof error === 'object' && 'data' in error;
};

export function getToken() {
  const rawData = storage.getString('persist:root'); // First get the string from MMKV

  if (rawData) {
    try {
      const parsedData = JSON.parse(rawData); // First parse
      const finalData = JSON.parse(parsedData.auth); // Second parse for the 'auth' field
      return finalData.user.token;
    } catch (error) {
      console.log('error from getToken function: ', error);
      Alert.alert('Error', 'Error while parsing token.');
    }
  }
}

export const formatAge = (date: string) => {
  const birthDate = parseISO(date);
  const now = new Date();

  const years = differenceInYears(now, birthDate);
  const months = differenceInMonths(now, birthDate) % 12;

  return `${years} years ${months} months`;
};

export const adoptionlist: IOptionList[] = [
  {
    label: AdoptionStatus.Adopted, value: 'adopted' 
  },
  {
    label: AdoptionStatus.NotAdopted, value: 'notAdopted' 
  },
];

export const genderList: IOptionList[] = [
  {
    label: Gender.Male, value: 'male'
  }, 
  {
    label: Gender.Female, value: 'female'
  }
];

export const nuteredOptionList: IOptionList[] = [
  {
    label: 'sterilised', value: true
  },
  {
    label: 'not sterilised', value: false
  },
];