import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet 
} from 'react-native';
import { Icon } from '../Icons';
import { IconLibraryName } from '@/utils/enum';

type MenuProps = {
  options: string[];
  onSelect: (value: string) => void;
  triggerText?: string;
};

export const Menu: React.FC<MenuProps> = ({ options, onSelect, triggerText = 'Open Menu' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsMenuOpen(false);
  };

  return (
    <View style={styles.container}>
      {/* Menu Trigger */}
      <TouchableOpacity style={styles.trigger} onPress={toggleMenu}>
        {/* <Text style={styles.triggerText}>{triggerText}</Text> */}
        <Icon name='dots-three-vertical' library={IconLibraryName.Entypo} size={26} color={'#000'} />
      </TouchableOpacity>

      {/* Menu Options */}
      {isMenuOpen && (
        <View style={[styles.menu, {
          top: 25
        }]}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => handleSelect(option)}
            >
              <Text style={styles.menuItemText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  trigger: {
    borderRadius: 5,
    position: 'relative'
  },
  triggerText: {
    color: '#fff',
    fontSize: 16,
  },
  menu: {
    position: 'absolute',
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    width: 150,
    elevation: 2, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      width: 0, height: 2 
    },
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },
});