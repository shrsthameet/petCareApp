import axios, { AxiosError } from 'axios';
import { Shape, Size } from '../enum';
import { ShapeType, SizeType } from './main';
import { ITheme } from './themeType';

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
  case Size.Small:
    return theme.spacing.xs;
  case Size.Medium:
    return theme.spacing.sm;
  case Size.Large:
    return theme.spacing.md;
  default:
    return theme.spacing.sm;
  }
}