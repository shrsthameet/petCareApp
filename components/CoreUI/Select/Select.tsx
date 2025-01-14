import React, { useState, useRef } from 'react';
import {
  Pressable,
  Animated,
  GestureResponderEvent,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Column } from '../Flex';
import { Icon } from '../Icons';
import { Typography } from '../Typography';
import { getSelectStyles } from './Select.style';
import { RootState } from '@/redux/rootReducer';
import {
  IconLibraryName,
  Shape,
  Size,
  TypographyVariant
} from '@/utils/enum';
import { ShapeType, SizeType } from '@/utils/types';

interface Option {
  label: string;
  value: string;
}

interface ISelectProps {
  options: Option[];
  selectedValue?: string;
  onSelect: (value: string, event: GestureResponderEvent) => void;
  placeholder?: string;
  size?: SizeType;
  shape?: ShapeType;
  style?: object;
  dropdownStyle?: object;
}

export const Select: React.FC<ISelectProps> = ({
  options,
  selectedValue,
  onSelect,
  placeholder = 'Select an option',
  size = Size.Small,
  shape = Shape.Pill,
  style,
  dropdownStyle,
}) => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownAnimation = useRef(new Animated.Value(0)).current;
  const arrowAnimation = useRef(new Animated.Value(0)).current;

  const styles = getSelectStyles(theme, size, shape);

  const toggleDropdown = () => {
    if (isDropdownVisible) {
      // Animate dropdown close and arrow rotation
      Animated.parallel([
        Animated.timing(dropdownAnimation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(arrowAnimation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => setDropdownVisible(false));
    } else {
      setDropdownVisible(true);
      // Animate dropdown open and arrow rotation
      Animated.parallel([
        Animated.timing(dropdownAnimation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(arrowAnimation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const handleOptionPress = (value: string, event: GestureResponderEvent) => {
    onSelect(value, event);
    toggleDropdown();
  };

  const animatedDropdownStyle = {
    opacity: dropdownAnimation,
    transform: [
      {
        scaleY: dropdownAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1],
        }),
      },
    ],
  };

  const animatedArrowStyle = {
    transform: [
      {
        rotate: arrowAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg'], // Rotate the arrow 180 degrees
        }),
      },
    ],
  };

  const selectedLabel = options.find((opt) => opt.value === selectedValue)?.label;

  return (
    <Column style={[styles.container, style]}>
      <Pressable
        style={[styles.selectButton]}
        onPress={toggleDropdown}
      >
        <Typography variant={TypographyVariant.Body} size={size}>
          {selectedLabel || placeholder}
        </Typography>
        <Animated.View style={animatedArrowStyle}>
          <Icon name='chevron-down' library={IconLibraryName.Entypo} size={20} color='#000' />
        </Animated.View>
      </Pressable>

      {/* Dropdown with Animation */}
      {isDropdownVisible && (
        <Animated.View
          style={[styles.dropdown, animatedDropdownStyle, dropdownStyle]}
        >
          {options.map((option, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.option,
                pressed && styles.optionPressed,
                selectedValue === option.value && styles.selectedOption
              ]}
              onPress={(event) => handleOptionPress(option.value, event)}
            >
              <Typography variant={TypographyVariant.Body} size={size}>
                {option.label}
              </Typography>
            </Pressable>
          ))}
        </Animated.View>
      )}
    </Column>
  );
};