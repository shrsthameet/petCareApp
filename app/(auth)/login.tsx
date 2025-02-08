import React, { FC, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { Column } from '@/components/CoreUI/Flex';
import {
  ButtonTitle,
  FlexJustifyContent,
  Form,
  InputType,
} from '@/utils/enum';
import { AppDispatch } from '@/redux/store';
import { RootState } from '@/redux/rootReducer';
import { ErrorResponse, ITheme } from '@/utils/types';
import { UserCredForm } from '@/components/AuthLayout';
import { FormData } from '@/utils/constants';
import { ROUTES } from '@/utils/types/routesType';
import { useLoginMutation } from '@/redux/authSlice/authApi';
import { setCredentials } from '@/redux/authSlice';
import { isFetchBaseQueryError } from '@/utils/types/appUtils';

interface ILoginState {
  email: string;
  password: string;
}

const Login: FC = () => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [login, { isLoading }] = useLoginMutation();

  const styles = getLoginStyles(theme);

  const [loginState, setLoginState] = useState<ILoginState>({
    email: '',
    password: ''
  });

  const { email, password } = loginState;

  const handleChange = (field: string, value: string) => {
    setLoginState((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };
  
  const handleSubmit = async () => {
    const credentials = {
      email,
      password
    };

    try {
      const result = await login(credentials).unwrap();
      if (result.success) {
        dispatch(setCredentials(result.data));
        // router.push(ROUTES.PET_PROFILE_SETUP.DEFAULT);
      }
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const data = error.data as ErrorResponse;
        Alert.alert('Error', data.error || data.message || 'Something went wrong');
      } else {
        Alert.alert('Error', 'An unexpected error occurred');
      }
    }
  };

  const formFields = [
    {
      title: FormData.Login.email.title,
      placeholder: FormData.Login.email.placeholder,
      name: FormData.Login.email.name,
      type: InputType.Email,
      value: email
    },
    {
      title: FormData.Login.password.title,
      placeholder: FormData.Login.password.placeholder,
      name: FormData.Login.password.name,
      type: InputType.Password,
      value: password,
    }
  ];

  const navigateToRegister = () => {
    router.replace(ROUTES.AUTH.REGISTER);
  };

  return (
    <Column flex={1} gap={20} justifyContent={FlexJustifyContent.Between} style={styles.loginContainer}>
      <UserCredForm 
        formFields={formFields}
        handleChange={handleChange}
        onSubmit={handleSubmit}
        btnTitle={ButtonTitle.Login}
        handleClick={navigateToRegister}
        formType={Form.Login}
        isLoading={isLoading}
      />
    </Column>
  );
};

export default Login;

export const getLoginStyles = (theme: ITheme) => StyleSheet.create({
  loginContainer: {
    padding: 20,
    marginBottom: 40
  }
});