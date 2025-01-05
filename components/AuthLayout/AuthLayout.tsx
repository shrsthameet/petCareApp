import { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { RootState } from '@/redux/rootReducer';

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth.loginState);
  const router = useRouter();
  const segments = useSegments();  // Get the current path segments

  useEffect(() => {
    const currentPath = `/${segments.join('/')}`;  // Construct the current path from segments

    if (!isAuthenticated && currentPath !== '/auth/login' && !isLoading) {
      router.replace('/auth/login');
    }
    if (isAuthenticated && (currentPath === '/auth/login' || currentPath === '/auth/register')) {
      router.replace('/(tabs)');
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

  return <>{children}</>;  // Render all stack screens (login, dashboard, etc.)
}