import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
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
import { ITheme } from '@/utils/types';
import { register } from '@/redux/authSlice/authService';
import { ROUTES } from '@/utils/types/routesType';
import { setAuth } from '@/redux/authSlice';

interface IRegisterState {
  email: string;
  password: string;
  termsAndCondition: boolean;
}

export const Register = () => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const styles = getRegisterStyles(theme);

  const [registerState, setRegisterState] = useState<IRegisterState>({
    email: '',
    password: '',
    termsAndCondition: false
  });

  const { email, password, termsAndCondition } = registerState;

  const handleChange = (field: string, value: string) => {
    setRegisterState((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };
  
  const handleSubmit = () => {
    const credentials = {
      email,
      password
    };

    // dispatch(register(credentials));
    dispatch(setAuth());
    router.push('/(petProfileSetup)');
  };

  const formFields = [
    {
      title: FormData.Register.firstName.title,
      placeholder: FormData.Register.firstName.placeholder,
      name: FormData.Register.firstName.name,
      type: InputType.Text,
      value: email
    },
    {
      title: FormData.Register.lastName.title,
      placeholder: FormData.Register.lastName.placeholder,
      name: FormData.Register.lastName.name,
      type: InputType.Text,
      value: email
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
      value: password,
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

  return (
    <Column flex={1} gap={20} justifyContent={FlexJustifyContent.Between} style={styles.loginContainer}>
      <UserCredForm
        formFields={formFields}
        handleChange={handleChange}
        onSubmit={handleSubmit}
        btnTitle={ButtonTitle.Register}
        handleClick={navigateToLogin}
        formType={Form.Register}
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
