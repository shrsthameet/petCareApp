import { Tabs } from 'expo-router';
import React from 'react';
// import { StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';
// import { BlurView } from 'expo-blur';
import { HapticTab } from '@/components/archive/HapticTab';
import { RootState } from '@/redux/rootReducer';
import { Icon } from '@/components/CoreUI/Icons';
import { IconLibraryName } from '@/utils/enum';

const grey = 'rgb(169,169,169)';

export default function TabLayout() {
  const { theme } = useSelector((state: RootState) => state.theme);
  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: grey,
        headerShown: false,
        tabBarButton: HapticTab,
        // tabBarBackground: () => (
        //   <BlurView tint='light' intensity={100} style={StyleSheet.absoluteFill} />
        // ),
        // tabBarStyle: {
        //   position: 'absolute'
        // },
      }}>
      <Tabs.Screen
        name='(home)'
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Icon name='home' library={IconLibraryName.AntDesign} size={24} color={focused ? theme.colors.primary : grey} />
          ),
        }}
      />
      <Tabs.Screen
        name='(petHealthRecords)'
        options={{
          title: 'Health Records',
          tabBarIcon: ({ focused }) => (
            <Icon name='heart-pulse' library={IconLibraryName.MaterialCommunityIcons} size={28} color={focused ? theme.colors.primary : grey} />
          ),
        }}
      />
      <Tabs.Screen
        name='explore'
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused }) => (
            <Icon name='edit' library={IconLibraryName.MaterialIcons} size={28} color={focused ? theme.colors.primary : grey} />
          ),
        }}
      />
      <Tabs.Screen
        name='(components)'
        options={{
          title: 'UI Library',
          tabBarIcon: ({ focused }) => (
            <Icon name='library' library={IconLibraryName.Ionicons} size={28} color={focused ? theme.colors.primary : grey} />
          ),
        }}
      />
    </Tabs>
  );
}
