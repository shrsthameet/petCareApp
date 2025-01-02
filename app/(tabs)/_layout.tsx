import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';
import { BlurView } from 'expo-blur';
import { HapticTab } from '@/components/archive/HapticTab';
import { RootState } from '@/redux/rootReducer';
import { Icon } from '@/components/CoreUI/Icons';
import { IconLibraryName } from '@/utils/enum';

export default function TabLayout() {
  const { theme } = useSelector((state: RootState) => state.theme);
  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarActiveTintColor: theme.colors.text,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: () => (
          <BlurView tint='light' intensity={100} style={StyleSheet.absoluteFill} />
        ),
        tabBarStyle: {
          position: 'absolute' 
        },
      }}>
      <Tabs.Screen
        name='(home)'
        options={{
          title: 'Home',
          tabBarIcon: () => (
            <Icon name='home' library={IconLibraryName.MaterialIcons} size={28} color={theme.colors.text} />
          ),
        }}
      />
      <Tabs.Screen
        name='explore'
        options={{
          title: 'Explore',
          tabBarIcon: () => (
            <Icon name='edit' library={IconLibraryName.MaterialIcons} size={28} color={theme.colors.text} />
          ),
        }}
      />
      <Tabs.Screen
        name='(components)'
        options={{
          title: 'UI Library',
          tabBarIcon: () => (
            <Icon name='library' library={IconLibraryName.Ionicons} size={28} color={theme.colors.text} />
          ),
        }}
      />
    </Tabs>
  );
}
