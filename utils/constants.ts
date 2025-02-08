import {
  ButtonTitle,
  Fonts,
  Form,
  InputFields
} from './enum';
import { ROUTES } from './types/routesType';

// Define the font weights using Montserrat
export const FontWeights = {
  100: Fonts.Montserrat_Thin,
  400: Fonts.Montserrat_Regular,
  500: Fonts.Montserrat_Medium,
  600: Fonts.Montserrat_SemiBold,
  700: Fonts.Montserrat_Bold,
};

export const FormData = {
  [Form.Login]: {
    formTitle: 'Hello,',
    subTitle: 'Welcome Back!',
    desc: 'Reconnect with your pets and start taking care of them.',
    member: 'Not a member?',
    action: {
      title: ButtonTitle.Register,
      link: ROUTES.AUTH.REGISTER
    },
    resetPassword: {
      title: 'Forgot password?',
      link: ''
    },
    [InputFields.Email]: {
      title: 'Email',
      name: 'email',
      placeholder: 'Enter your email address',
      desc: ''
    },
    [InputFields.Password]: {
      title: 'Password',
      name: 'password',
      placeholder: 'Enter your password',
      desc: ''
    },
  },
  [Form.Register]: {
    formTitle: '',
    subTitle: 'Create New Account',
    desc: 'Join the community and start taking care of your pets.',
    member: 'Already a member?',
    action: {
      title: ButtonTitle.Login,
      link: ROUTES.AUTH.LOGIN
    },
    [InputFields.FirstName]: {
      title: 'First name',
      name: 'firstName',
      placeholder: 'First name',
      desc: ''
    },
    [InputFields.LastName]: {
      title: 'Last name',
      name: 'lastName',
      placeholder: 'Last name',
      desc: ''
    },
    [InputFields.Email]: {
      title: 'Email',
      name: 'email',
      placeholder: 'Enter your email address',
      desc: ''
    },
    [InputFields.Password]: {
      title: 'Password',
      name: 'password',
      placeholder: 'Enter your password',
      desc: ''
    },
    [InputFields.ConfirmPassword]: {
      title: 'Confirm password',
      name: 'confirmPassword',
      placeholder: 'Confirm your password',
      desc: ''
    },
    [InputFields.TermsAndCondition]: {
      title: 'Confirm password',
      name: 'termsAndCondition',
      placeholder: '',
      desc: 'I agree to the Terms of Service and Privacy Policy'
    },
  }
};

export const ErrMsg = {
  NOT_FOUND: 'Cannot perform a requested action. Resource not found!',
  ALREADY_EXIST: 'Already exists. Please choose something different!',
  VALIDATION: 'Validation error!',
  USER_EXISTS: 'User with this email already exists. Please try to login instead!',
  INVALID_CREDENTIALS: 'Invalid credentials. Please try again.',
  SIGNOUT_ERROR: 'Error while signing out. Please try again',
  FORBIDDEN_MSG: 'Not allowed to access this page.',
  NOT_AUTHORISED: 'You are not authorised to access this page.',
  INTERNAL_ERR_MSG: 'Internal server error. Please try again later.',
  FIELD_REQUIRED: 'Field is required!',
  INVALID: 'Invalid!',
  NO_DATA: 'No data found. Add new item.',
  STH_WENT_WRONG: 'Something went wrong.',
};

export const SuccessMsg = {
  RESOURCE_RETRIEVED: 'Retrieved successfully!',
  RESOURCE_CREATED: 'Created successfully!',
  NO_DATA: 'No items found.',
  UPDATED: 'Updated successfully!',
  DELETED: 'Deleted successfully!',
  USER_LOGIN: 'Successfully login!',
  USER_LOGOUT: 'Successully logout!'
};

export const StatusCode = {
  NOT_FOUND: 404,
  VALIDATION_ERROR: 422,
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORISED: 401,
  BAD_REQUEST: 400,
  FORBIDDEN: 403
};


