import React, { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { RootState } from '@/redux/rootReducer';
import { ROUTES } from '@/utils/types/routesType';
import { AuthRoutes } from '@/utils/enum';

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth.loginState);
  const router = useRouter();
  const segments = useSegments();  // Get the current path segments

  useEffect(() => {
    const currentPath = `/${segments.join('/')}`;  // Construct the current path from segments

    if (!isAuthenticated) {
      if (currentPath === ROUTES.AUTH.LOGIN || currentPath === ROUTES.AUTH.REGISTER) {
        // Allow the user to stay on login/register pages if not authenticated
        return;
      }
      // Redirect to login if the user is not authenticated and trying to access a protected route
      router.replace(ROUTES.AUTH.LOGIN);
    } else {
      // Redirect authenticated users to the main app (tabs)
      if ([ROUTES.AUTH.LOGIN, ROUTES.AUTH.REGISTER].includes(currentPath as AuthRoutes)) {
        router.replace('/(tabs)');
      }
    }
  }, [isAuthenticated, isLoading, segments, router]);

  if (isLoading) {
    return (
      <View style={{
        flex: 1, justifyContent: 'center', alignItems: 'center' 
      }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return <React.Fragment>{children}</React.Fragment>;  // Render all stack screens (login, dashboard, etc.)
}