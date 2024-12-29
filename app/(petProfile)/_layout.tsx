import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Icon } from '@/components/CoreUI/Icons';
import { IconLibraryName } from '@/utils/enum';

export default function PetProfileLayout() {
  const router = useRouter();

  const goBack = (): void => {
    router.back();
  };

  const editPet = (): void => {
    router.push('/(petProfile)/edit/1');
  };

  return (
    <Stack screenOptions={{
      headerTitle: '',
      headerLeft: () => (
        <TouchableOpacity onPress={goBack}>
          <Icon name='chevron-back' library={IconLibraryName.Ionicons} size={26} color={Colors.pitchBlack} />
        </TouchableOpacity>
      ),
      contentStyle: {
        backgroundColor: '#fff'
      },
    }}>
      <Stack.Screen name='view/[id]' options={{
        headerTransparent: true,
        headerRight: () => (
          <TouchableOpacity onPress={editPet}>
            <Icon name='mode-edit' library={IconLibraryName.MaterialIcons} size={26} color={Colors.pitchBlack} />
          </TouchableOpacity>
        )
      }}/>
      {/* <Stack.Screen name='edit/[id]' options={{
        headerTitle: 'Edit'
      }}/>
      <Stack.Screen name='create/index' /> */}
    </Stack>
  );
}