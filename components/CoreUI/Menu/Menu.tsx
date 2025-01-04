import React, { useState, useRef, useEffect } from 'react';
import {
  TouchableOpacity, StyleSheet, Animated, TouchableWithoutFeedback, View, Dimensions 
} from 'react-native';
import { Icon } from '../Icons/Icons';
import { Typography } from '../Typography';
import { Column } from '../Flex';
import { IconLibraries } from '@/utils/types';
import { Size, TypographyVariant } from '@/utils/enum';

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
  menuVisible: boolean;
  toggleMenu: () => void;
  position?: 'left' | 'right'; // New prop to determine menu position
}

export const Menu: React.FC<MenuProps> = ({
  menuItems,
  iconName = 'menu',
  iconSize = 24,
  iconColor = '#000',
  iconLibrary = 'AntDesign',
  menuVisible,
  toggleMenu,
  position = 'right', // Default to 'right' if not provided
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [menuPosition, setMenuPosition] = useState<'left' | 'right'>(position);

  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    // Recalculate the position if the screen width changes
    const menuWidth = 150; // Or use dynamic width based on menu items
    if (menuPosition === 'left') {
      setMenuPosition(screenWidth - menuWidth <= 0 ? 'right' : 'left');
    }
  }, [screenWidth, menuPosition]);

  const handleMenuToggle = () => {
    toggleMenu(); // This calls the parent function to toggle the menu visibility
    Animated.timing(fadeAnim, {
      toValue: menuVisible ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Column>
      {/* Menu Icon */}
      <TouchableOpacity onPress={handleMenuToggle}>
        <Icon name={iconName} library={iconLibrary} size={iconSize} color={iconColor} />
      </TouchableOpacity>

      {/* Menu Items */}
      {menuVisible && (
        <TouchableWithoutFeedback onPress={() => toggleMenu()}>
          <View style={styles.overlay}>
            <Animated.View
              style={[
                styles.menuContainer,
                {
                  opacity: fadeAnim 
                },
                menuPosition === 'right'
                  ? {
                    right: 0 
                  }
                  : {
                    left: 0 
                  }, // Use dynamic position
              ]}
            >
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  onPress={item.onPress}
                >
                  <Typography variant={TypographyVariant.Body} size={Size.Small}>
                    {item.label}
                  </Typography>
                </TouchableOpacity>
              ))}
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </Column>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000000,
    padding: 10,
    minWidth: 150, // Or calculate based on menu items
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 'auto',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
});