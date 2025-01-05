import React, { useState } from 'react';
import { Column } from '@/components/CoreUI/Flex';

interface IAuthScreenState {
  activeScreen?: string;
}

const AuthScreen = () => {
  const [authScreenState, setAuthScreenState] = useState<IAuthScreenState>({
    activeScreen: 'Login'
  });
  return (
    <Column>AuthScreen</Column>
  );
};

export default AuthScreen;
