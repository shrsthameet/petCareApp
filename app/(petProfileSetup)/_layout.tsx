import { Stack } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootReducer';


const PetProfileSetupLayout = () => {
  const { theme } = useSelector((state: RootState) => state.theme);

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: theme.colors.background
        },
        headerTransparent: true,
        title: '',
        headerLeft: () => null
      }}
    >
      <Stack.Screen name='index' 
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name='petTypeAndBreed' />
      <Stack.Screen name='petBio' />
      <Stack.Screen name='petInfo' />
      <Stack.Screen name='petProfileComplete'
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
};

export default PetProfileSetupLayout;