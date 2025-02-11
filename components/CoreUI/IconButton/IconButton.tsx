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
import { ShapeType, IconLibraries, SizeType } from '@/utils/types';
import {
  FlexAlignItems,
  FlexJustifyContent,
  Shape,
  Size
} from '@/utils/enum';

interface IconButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: ViewStyle;
  iconName: string;
  iconLibrary?: keyof typeof IconLibraries | 'AntDesign';
  iconSize?: number;
  iconColor?: string;
  shape?: ShapeType;
  size?: SizeType;
  bgColor?: string;
}

export const IconButton = (
  {
    onPress,
    disabled = false,
    style,
    iconName,
    iconLibrary = 'AntDesign',
    iconSize = 18,
    iconColor,
    shape = Shape.Circle,
    size = Size.Medium,
    bgColor
  }: IconButtonProps,
  ref: ForwardedRef<View>
) => {
  const { theme } = useSelector((state: RootState) => state.theme);

  // Define size-based styles
  const sizeStyles = {
    xsmall: {
      paddingVertical: theme.spacing.xs,
      paddingHorizontal: theme.spacing.xs,
      fontSize: theme.typography.caption?.large.fontSize,
    },
    small: {
      padding: theme.spacing.sm
    },
    medium: {
      padding: theme.spacing.md
    },
    large: {
      padding: theme.spacing.lg
    },
    xlarge: {
      paddingVertical: theme.spacing.xl,
      paddingHorizontal: theme.spacing.xl,
      fontSize: theme.typography.caption?.large.fontSize,
    },
  }[size];

  const buttonStyles: ViewStyle = {
    backgroundColor: bgColor ? bgColor : theme.colors.transparent,
    borderRadius: theme.borderRadius[shape] || theme.borderRadius.circle,
    alignItems: FlexAlignItems.Center,
    justifyContent: FlexJustifyContent.Center,
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
        color={disabled ? theme.colors.onSurfaceDisabled : iconColor ? iconColor :  theme.colors.onPrimary}
      />
    </TouchableOpacity>
  );
};