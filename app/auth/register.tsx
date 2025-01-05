import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { UserCredForm } from '@/components/AuthLayout';
import { Column } from '@/components/CoreUI/Flex';
import { RootState } from '@/redux/rootReducer';
import { AppDispatch } from '@/redux/store';
import { FormFieldsData } from '@/utils/constants';
import {
  ButtonTitle, FlexJustifyContent, FormTitles, InputField 
} from '@/utils/enum';
import { ITheme } from '@/utils/types';
import { register } from '@/redux/authSlice/authService';

interface IRegisterState {
  email: string;
  password: string;
}

export const Register = () => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch<AppDispatch>();

  const styles = getRegisterStyles(theme);

  const [loginState, setLoginState] = useState<IRegisterState>({
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

    dispatch(register(credentials));
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
        formTitle={FormTitles.Regsiter}
        handleChange={handleChange}
        onSubmit={handleSubmit}
        btnTitle={ButtonTitle.Register}
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
