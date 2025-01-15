import React, { useState, useEffect } from 'react';
import {
  View,
  Pressable,
  Animated,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Typography } from '../Typography';
import { getRadioButtonStyles } from './RadioButton.style';
import { FlexDirectionType, SizeType } from '@/utils/types';
import { FlexDirection, Size, TypographyVariant } from '@/utils/enum';
import { RootState } from '@/redux/rootReducer';

interface RadioButtonProps {
  options: { label: string; value: string }[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  size?: SizeType;
  direction?: FlexDirectionType; // New prop for layout direction
  disabled?: boolean;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  options,
  selectedValue,
  onValueChange,
  size = Size.Small,
  direction = FlexDirection.Column,
  disabled = false,
}) => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const [scaleAnim] = useState(new Animated.Value(1)); // For scaling animation

  const styles = getRadioButtonStyles(theme, size);

  useEffect(() => {
    // Trigger the animation when selectedValue changes
    if (selectedValue) {
      Animated.spring(scaleAnim, {
        toValue: 1.2, // Scale up
        friction: 4,
        tension: 80,
        useNativeDriver: true,
      }).start(() => {
        Animated.spring(scaleAnim, {
          toValue: 1, // Scale back to normal
          friction: 4,
          tension: 80,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [selectedValue]);

  return (
    <View
      style={[
        styles.container,
        direction === FlexDirection.Row && styles.rowDirection,
      ]}
    >
      {options.map((option) => (
        <Pressable
          key={option.value}
          style={[
            styles.radioButtonContainer,
            direction === FlexDirection.Row && styles.radioButtonRow,
          ]}
          onPress={() => onValueChange(option.value)}
          disabled={disabled}
        >
          <Animated.View
            style={[
              styles.radioCircle,
              selectedValue === option.value && styles.radioCircleSelected,
              disabled && styles.radioCircleDisabled,
              {
                transform: [{
                  scale: selectedValue === option.value ? scaleAnim : 1 
                }] 
              }, // Apply scale animation
            ]}
          >
            {selectedValue === option.value && (
              <View style={styles.radioCircleInner} />
            )}
          </Animated.View>
          <Typography
            variant={TypographyVariant.Body}
            size={size}
            style={[
              styles.radioLabel,
              disabled ? styles.radioLabelDisabled : {
              },
            ]}
          >
            {option.label}
          </Typography>
        </Pressable>
      ))}
    </View>
  );
};
