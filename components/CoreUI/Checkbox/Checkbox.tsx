import React, { FC, useEffect, useRef } from 'react';
import {
  Pressable,
  Animated,
  GestureResponderEvent
} from 'react-native';
import { useSelector } from 'react-redux';
import { Typography } from '../Typography';
import { Icon } from '../Icons';
import { getCheckboxStyles } from './Checkbox.style';
import { RootState } from '@/redux/rootReducer';
import { PositionType, SizeType } from '@/utils/types';
import {
  IconLibraryName, Position, Size, TypographyVariant 
} from '@/utils/enum';
import { getSize } from '@/utils/types/appUtils';

interface ICheckboxProps {
  checked: boolean;
  onChange: (checked: boolean, event: GestureResponderEvent) => void;
  label?: string;
  labelPosition?: PositionType;
  size?: SizeType;
  color?: string;
  style?: object;
  disabled?: boolean;
}

export const Checkbox: FC<ICheckboxProps> = ({
  checked,
  onChange,
  label,
  labelPosition = Position.Right,
  size = Size.Medium,
  color,
  style,
  disabled = false
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const { theme } = useSelector((state: RootState) => state.theme);

  const styles = getCheckboxStyles(theme, color, checked);

  useEffect(() => {
    // Scale animation when the checkbox is toggled
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [checked]);

  const handlePress = (event: GestureResponderEvent) => {
    onChange(!checked, event);
  };

  const checkboxSize = getSize(theme, size);

  return (
    <Pressable
      style={[styles.container, style]}
      onPress={handlePress}
      accessibilityRole='checkbox'
      accessibilityState={{
        checked 
      }}
    >
      {label && labelPosition === Position.Left && (
        <Typography variant={TypographyVariant.Caption} size={size}>
          {label}
        </Typography>
      )}
      <Animated.View
        style={[
          styles.checkbox,
          {
            width: checkboxSize,
            height: checkboxSize,
            transform: [{
              scale: scaleAnim
            }],
          },
        ]}
      >
        {checked && (
          <Icon
            name='check'
            library={IconLibraryName.Entypo}
            size={checkboxSize * 0.6}
            color={disabled ? theme.colors.onSurfaceDisabled : theme.colors.onPrimary}
          />
        )}
      </Animated.View>
      {label && labelPosition === Position.Right && (
        <Typography variant={TypographyVariant.Caption} size={size}>
          {label}
        </Typography>
      )}
    </Pressable>
  );
};