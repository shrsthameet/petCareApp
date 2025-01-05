import React, { FC, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Column } from '@/components/CoreUI/Flex';
import {
  ButtonTitle,
  FlexJustifyContent,
  FormTitles,
  InputField,
} from '@/utils/enum';
import { login } from '@/redux/authSlice/authService';
import { AppDispatch } from '@/redux/store';
import { RootState } from '@/redux/rootReducer';
import { ITheme } from '@/utils/types';
import { UserCredForm } from '@/components/AuthLayout';
import { FormFieldsData } from '@/utils/constants';

interface ILoginState {
  email: string;
  password: string;
}

const Login: FC = () => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch<AppDispatch>();

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
  
  const handleSubmit = () => {
    const credentials = {
      email,
      password
    };

    dispatch(login(credentials));
  };

  const formFields = [
    {
      title: FormFieldsData.Login.email.title,
      placeholder: FormFieldsData.Login.email.placeholder,
      name: FormFieldsData.Login.email.name,
      type: InputField.Email,
      value: email
    },
    {
      title: FormFieldsData.Login.password.title,
      placeholder: FormFieldsData.Login.password.placeholder,
      name: FormFieldsData.Login.password.name,
      type: InputField.Password,
      value: password,
    }
  ];

  return (
    <Column flex={1} gap={20} justifyContent={FlexJustifyContent.Between} style={styles.loginContainer}>
      <UserCredForm 
        formFields={formFields}
        formTitle={FormTitles.Login}
        handleChange={handleChange}
        onSubmit={handleSubmit}
        btnTitle={ButtonTitle.Login}
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