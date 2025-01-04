import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Icon } from '@/components/CoreUI/Icons';
import { IconLibraryName } from '@/utils/enum';
import { Menu } from '@/components/CoreUI/Menu';

export default function PetProfileLayout() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const goBack = (): void => {
    router.back();
  };

  const editPet = (): void => {
    router.push('/(petProfile)/edit/1');
  };

  const handleMenuItemPress = (label: string) => {
    console.log(`${label} pressed`);
  };


  const menuItems = [
    {
      label: 'Profile', onPress: () => handleMenuItemPress('Profile') 
    },
    {
      label: 'Settings', onPress: () => handleMenuItemPress('Settings') 
    },
    {
      label: 'Logout', onPress: () => handleMenuItemPress('Logout') 
    }
  ];

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
          <>
            {/* <TouchableOpacity onPress={editPet}>
            <Icon name='mode-edit' library={IconLibraryName.MaterialIcons} size={26} color={Colors.pitchBlack} />
          </TouchableOpacity> */}
            <Menu
              menuItems={menuItems}
              iconName='dots-three-vertical'
              iconSize={24}
              iconColor='#007BFF'
              iconLibrary={IconLibraryName.Entypo}
              menuVisible={menuVisible}
              toggleMenu={toggleMenu}
              position='right'
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