import React from 'react';
import { Stack } from 'expo-router';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/redux/rootReducer';

const AuthLayout = () => {
  // const { theme } = useSelector((state: RootState) => state.theme);
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        contentStyle: {
          backgroundColor: '#f3fcff'
          // backgroundColor: theme.colors.secondaryContainer
        },
        title: ''
      }}
    >
      <Stack.Screen name='login' />
      <Stack.Screen name='register' />
    </Stack>
  );
};

export default AuthLayout;