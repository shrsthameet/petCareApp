import React, { useRef } from 'react';
import {
  View,
  Pressable,
  Animated,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Typography } from '../Typography';
import { getRadioButtonStyles } from './RadioButton.style';
import {
  FlexDirectionType, IOptionList, FormValueType, SizeType 
} from '@/utils/types';
import { FlexDirection, Size, TypographyVariant } from '@/utils/enum';
import { RootState } from '@/redux/rootReducer';

interface RadioButtonProps {
  options: IOptionList[];
  selectedValue: string | boolean;
  onValueChange: (value: FormValueType) => void;
  size?: SizeType;
  direction?: FlexDirectionType;
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
  const styles = getRadioButtonStyles(theme, size);

  // Animation values for each option
  const animatedValues = useRef(
    options.map(() => new Animated.Value(1)) // Initial scale of 1 for each option
  ).current;

  // Function to handle the spring animation
  const handlePress = (value: FormValueType, index: number) => {
    // Trigger animation: scale up and bounce back immediately
    animatedValues[index].setValue(1); // Reset to initial value
    Animated.spring(animatedValues[index], {
      toValue: 1.2, // Slight scale-up
      useNativeDriver: true,
      friction: 4, // Controls bounciness
      tension: 150, // Controls speed
    }).start(() => {
      // Bounce back to normal size
      Animated.spring(animatedValues[index], {
        toValue: 1, // Scale back to normal
        useNativeDriver: true,
        friction: 4, // Smoother return
        tension: 150, // Controls speed
      }).start();
    });

    // Call the provided onValueChange handler
    onValueChange(value);
  };

  return (
    <View
      style={[
        styles.container,
        direction === FlexDirection.Row && styles.rowDirection,
      ]}
    >
      {options.map((option, index) => (
        <Pressable
          key={index}
          style={[
            styles.radioButtonContainer,
            direction === FlexDirection.Row && styles.radioButtonRow,
          ]}
          onPress={() => handlePress(option.value, index)}
          disabled={disabled}
        >
          <Animated.View
            style={[
              styles.radioCircle,
              selectedValue === option.value && styles.radioCircleSelected,
              disabled && styles.radioCircleDisabled,
              {
                transform: [{
                  scale: animatedValues[index] 
                }], // Add scale animation
              },
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