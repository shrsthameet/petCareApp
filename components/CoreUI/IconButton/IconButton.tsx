import React, { ForwardedRef } from 'react';
import {
  TouchableOpacity,
  ViewStyle,
  GestureResponderEvent,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Icon } from '../Icons';
import { RootState } from '@/redux/rootReducer';
import {
  ShapeType, ColorVariantType, IconLibraries, SizeType 
} from '@/utils/types';
import { Shape, ColorVariant, Size } from '@/utils/enum';

interface IconButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: ViewStyle;
  iconName: string;
  iconLibrary?: keyof typeof IconLibraries | 'AntDesign';
  iconSize?: number;
  iconColor?: ColorVariantType;
  shape?: ShapeType;
  size?: SizeType;
}

export const IconButton = (
  {
    onPress,
    disabled = false,
    style,
    iconName,
    iconLibrary = 'AntDesign',
    iconSize = 18,
    iconColor = ColorVariant.Primary,
    shape = Shape.Circle,
    size = Size.Medium,
  }: IconButtonProps,
  ref: ForwardedRef<View>
) => {
  const { theme } = useSelector((state: RootState) => state.theme);

  // Determine button background color
  const getBackgroundColor = () => (disabled
    ? theme.colors.surfaceDisabled
    : theme.colors[iconColor as keyof typeof theme.colors] || theme.colors.primary);

  // Define size-based styles
  const sizeStyles = {
    small: {
      padding: theme.spacing.sm
    },
    medium: {
      padding: theme.spacing.md
    },
    large: {
      padding: theme.spacing.lg
    },
  }[size];

  const buttonStyles: ViewStyle = {
    backgroundColor: getBackgroundColor() as string,
    borderRadius: theme.borderRadius[shape] || theme.borderRadius.circle,
    alignItems: 'center',
    justifyContent: 'center',
    ...sizeStyles,
    ...style,
  };

  return (
    <TouchableOpacity
      ref={ref}
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Icon
        library={iconLibrary}
        name={iconName}
        size={iconSize}
        color={disabled ? theme.colors.onSurfaceDisabled : theme.colors.onPrimary}
      />
    </TouchableOpacity>
  );
};