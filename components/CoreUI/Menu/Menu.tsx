import React, { useState, useRef } from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Icon } from '../Icons/Icons';
import { Typography } from '../Typography';
import { FlexContainer } from '../FlexContainer';
import { Colors } from '@/constants/Colors';
import { IconLibraries } from '@/utils/types';

interface MenuItem {
  label: string;
  onPress: () => void;
}

interface MenuProps {
  menuItems: MenuItem[];
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
  iconLibrary?: keyof typeof IconLibraries;
}

export const Menu: React.FC<MenuProps> = ({
  menuItems,
  iconName = 'menu',
  iconSize = 24,
  iconColor = '#000',
  iconLibrary = 'AntDesign'
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    Animated.timing(fadeAnim, {
      toValue: menuVisible ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <FlexContainer>
      {/* Menu Icon */}
      <TouchableOpacity onPress={toggleMenu}>
        <Icon name={iconName} library={iconLibrary} size={iconSize} color={iconColor} />
      </TouchableOpacity>

      {/* Menu Items */}
      {menuVisible && (
        <Animated.View style={[styles.menuContainer, {
          opacity: fadeAnim 
        }]}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
              <Typography variant='p' color={Colors.pitchBlack}>{item.label}</Typography>
            </TouchableOpacity>
          ))}
        </Animated.View>
      )}
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 30,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0, height: 2 
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 9999,
    padding: 10,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 100
  }
});