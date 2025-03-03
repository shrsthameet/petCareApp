import React from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { IconLibraryName, Size } from '@/utils/enum';
import { RootState } from '@/redux/rootReducer';
import { IconButton } from '@/components/CoreUI/IconButton';

export default function PetProfileLayout() {
  const { theme } = useSelector((state: RootState) => state.theme);

  const { id } = useLocalSearchParams();
  const router = useRouter();

  const goBack = (): void => {
    router.back();
  };

  const editPet = (): void => {
    router.push(`/(petProfile)/edit/${id}`);
  };

  return (
    <Stack screenOptions={{
      headerTitle: '',
      headerLeft: () => (
        <IconButton
          iconLibrary={IconLibraryName.Ionicons}
          iconName='chevron-back'
          iconColor={theme.colors.onPrimaryContainer}
          iconSize={20}
          onPress={goBack}
          size={Size.XSmall}
          bgColor={theme.colors.onPrimary}
        />
      ),
      contentStyle: {
        backgroundColor: '#fff'
      },
    }}>
      <Stack.Screen name='view/[id]' options={{
        headerTransparent: true,
        headerRight: () => (
          <>
            <IconButton
              iconLibrary={IconLibraryName.MaterialIcons}
              iconName='mode-edit'
              iconColor={theme.colors.primary}
              iconSize={20}
              onPress={editPet}
              size={Size.XSmall}
              bgColor={theme.colors.onPrimary}
            />
          </>
        )
      }}/>
      <Stack.Screen name='edit/[id]' options={{
        headerTitle: 'Edit'
      }}/>
      {/* <Stack.Screen name='create/index' /> */}
    </Stack>
  );
}