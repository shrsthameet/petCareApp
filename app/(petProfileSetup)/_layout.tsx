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
        headerShown: false
      }}
    >
      <Stack.Screen name='index' />
      <Stack.Screen name='petTypeAndBreed' />
    </Stack>
  );
};

export default PetProfileSetupLayout;