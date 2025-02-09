import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Text } from 'react-native';
import MontserratThin from '@/assets/fonts/Montserrat-Thin.ttf';
import MontserratThinItalic from '@/assets/fonts/Montserrat-ThinItalic.ttf';
import MontserratMedium from '@/assets/fonts/Montserrat-Medium.ttf';
import MontserratMediumItalic from '@/assets/fonts/Montserrat-MediumItalic.ttf';
import MontserratRegular from '@/assets/fonts/Montserrat-Regular.ttf';
import MontserratSemiBold from '@/assets/fonts/Montserrat-SemiBold.ttf';
import MontserratSemiBoldItalic from '@/assets/fonts/Montserrat-SemiBoldItalic.ttf';
import MontserratBold from '@/assets/fonts/Montserrat-Bold.ttf';
import MontserratBoldItalic from '@/assets/fonts/Montserrat-BoldItalic.ttf';
import MontserratExtraBold from '@/assets/fonts/Montserrat-ExtraBold.ttf';
import MontserratExtraBoldItalic from '@/assets/fonts/Montserrat-ExtraBoldItalic.ttf';
import { store, persistor } from '@/redux/store';
import { AuthLayout } from '@/components/AuthLayout';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    MontserratThin,
    MontserratThinItalic,
    MontserratMedium,
    MontserratMediumItalic,
    MontserratRegular,
    MontserratSemiBold,
    MontserratSemiBoldItalic,
    MontserratBold,
    MontserratBoldItalic,
    MontserratExtraBold,
    MontserratExtraBoldItalic,
  });

  useEffect(() => {
    if (!fontsLoaded) SplashScreen.preventAutoHideAsync();
    else SplashScreen.hideAsync();
  }, [fontsLoaded]);
  
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <AuthLayout>
          <Stack screenOptions={{
            headerShown: false,
          }}>
            <Stack.Screen name='(drawer)' options={{
              headerShown: false
            }} />
            <Stack.Screen name='(petProfileSetup)' options={{
              headerShown: false,
            }} />
            <Stack.Screen name='+not-found' />
          </Stack>
          <StatusBar style='auto' />
        </AuthLayout>
      </PersistGate>
    </Provider>
  );
}
