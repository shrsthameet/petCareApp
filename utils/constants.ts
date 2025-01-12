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


