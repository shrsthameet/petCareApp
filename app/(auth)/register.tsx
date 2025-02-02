import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { UserCredForm } from '@/components/AuthLayout';
import { Column } from '@/components/CoreUI/Flex';
import { RootState } from '@/redux/rootReducer';
import { AppDispatch } from '@/redux/store';
import { FormData } from '@/utils/constants';
import {
  ButtonTitle,
  FlexJustifyContent,
  Form,
  InputType
} from '@/utils/enum';
import { ErrorResponse, ITheme } from '@/utils/types';
import { ROUTES } from '@/utils/types/routesType';
import { setCredentials } from '@/redux/authSlice';
import { useRegisterMutation } from '@/redux/authSlice/authApi';
import { isFetchBaseQueryError } from '@/utils/types/appUtils';

interface IRegisterState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAndCondition: boolean;
}

export const Register = () => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const router = useRouter();
  const [register, { isLoading, error, isSuccess, data }] = useRegisterMutation();
  const dispatch = useDispatch<AppDispatch>();

  const styles = getRegisterStyles(theme);

  const [registerState, setRegisterState] = useState<IRegisterState>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAndCondition: false
  });

  const { firstName, lastName, email, password, confirmPassword, termsAndCondition } = registerState;

  const handleChange = (field: string, value: string) => {
    setRegisterState((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };
  
  const handleSubmit = async () => {
    const credentials = {
      firstName,
      lastName,
      email,
      password
    };
    await register(credentials);
  };

  const formFields = [
    {
      title: FormData.Register.firstName.title,
      placeholder: FormData.Register.firstName.placeholder,
      name: FormData.Register.firstName.name,
      type: InputType.Text,
      value: firstName
    },
    {
      title: FormData.Register.lastName.title,
      placeholder: FormData.Register.lastName.placeholder,
      name: FormData.Register.lastName.name,
      type: InputType.Text,
      value: lastName
    },
    {
      title: FormData.Register.email.title,
      placeholder: FormData.Register.email.placeholder,
      name: FormData.Register.email.name,
      type: InputType.Email,
      value: email
    },
    {
      title: FormData.Register.password.title,
      placeholder: FormData.Register.password.placeholder,
      name: FormData.Register.password.name,
      type: InputType.Password,
      value: password,
    },
    {
      title: FormData.Register.confirmPassword.title,
      placeholder: FormData.Register.confirmPassword.placeholder,
      name: FormData.Register.confirmPassword.name,
      type: InputType.Password,
      value: confirmPassword,
    },
    {
      title: FormData.Register.termsAndCondition.title,
      placeholder: FormData.Register.termsAndCondition.placeholder,
      name: FormData.Register.termsAndCondition.name,
      type: InputType.Checkbox,
      checked: termsAndCondition,
      desc: FormData.Register.termsAndCondition.desc
    }
  ];

  const navigateToLogin = () => {
    router.replace(ROUTES.AUTH.LOGIN);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCredentials(data.data));
      router.push(ROUTES.PET_PROFILE_SETUP.DEFAULT);
    }
    if (error) {
      if (isFetchBaseQueryError(error)) {
        const data = error.data as ErrorResponse;
        Alert.alert('Error', data.error || data.message || 'Something went wrong');
      } else {
        Alert.alert('Error', 'An unexpected error occurred');
      }
    }
  }, [isSuccess, data, error, dispatch]);

  return (
    <Column flex={1} gap={20} justifyContent={FlexJustifyContent.Between} style={styles.loginContainer}>
      <UserCredForm
        formFields={formFields}
        handleChange={handleChange}
        onSubmit={handleSubmit}
        btnTitle={ButtonTitle.Register}
        handleClick={navigateToLogin}
        formType={Form.Register}
        isLoading={isLoading}
      />
    </Column>
  );
};

export default Register;

export const getRegisterStyles = (theme: ITheme) => StyleSheet.create({
  loginContainer: {
    padding: 20,
    marginBottom: 40
  }
});
