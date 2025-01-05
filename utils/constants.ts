import {
  ButtonTitle,
  Fonts,
  FormTitles,
  InputField
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

export const FormFieldsData = {
  [FormTitles.Login]: {
    member: 'Not a member?',
    action: {
      title: ButtonTitle.Register,
      link: ROUTES.AUTH.REGISTER
    },
    resetPassword: {
      title: 'Forgot password?',
      link: ''
    },
    [InputField.Email]: {
      title: 'Email',
      name: 'email',
      placeholder: 'Enter your email address',
    },
    [InputField.Password]: {
      title: 'Password',
      name: 'password',
      placeholder: 'Enter your password',
    },
  },
  [FormTitles.Regsiter]: {
    member: 'Already a member?',
    action: {
      title: ButtonTitle.Login,
      link: ROUTES.AUTH.LOGIN
    },
    [InputField.Email]: {
      title: 'Email',
      name: 'email',
      placeholder: 'Enter your email address',
    },
    [InputField.Password]: {
      title: 'Password',
      name: 'password',
      placeholder: 'Enter your password',
    },
  }
};


