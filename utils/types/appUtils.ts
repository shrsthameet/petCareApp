import axios, { AxiosError } from 'axios';

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