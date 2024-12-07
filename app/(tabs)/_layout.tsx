import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';
import { BlurView } from 'expo-blur';
import { HapticTab } from '@/components/archive/HapticTab';
import { IconSymbol } from '@/components/archive/ui/IconSymbol';
import { RootState } from '@/redux/rootReducer';

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
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name='house.fill' color={color} />,
        }}
      />
      <Tabs.Screen
        name='explore'
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name='paperplane.fill' color={color} />,
        }}
      />
    </Tabs>
  );
}
