import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { Image } from 'expo-image';
import { Typography } from '../Typography';
import { Column } from '../Flex';
import { getAvatarStyles } from './Avatar.style';
import { RootState } from '@/redux/rootReducer';
import { ShapeType, SizeType } from '@/utils/types';
import {
  FlexAlignItems,
  FlexJustifyContent,
  Fonts,
  Shape,
  Size,
  TypographyVariant,
} from '@/utils/enum';

// Function to extract initials from a full name
const getInitials = (name?: string): string => {
  if (!name || !name.trim()) {
    return '?';
  }
  const words = name.trim().split(' ').filter((word) => word.length > 0);
  if (words.length === 0) {
    return '?';
  }
  return words.length > 1
    ? words[0][0].toUpperCase() + words[1][0].toUpperCase()
    : words[0][0].toUpperCase();
};

type AvatarProps = {
  imageUrl?: string; // URL for the avatar image
  placeholder?: string; // Full name to extract initials from
  size?: SizeType; // Diameter of the avatar
  shape?: ShapeType; // Shape of the avatar
  showBorder?: boolean; // Show Border
  borderColor?: string; // Border color
  borderWidth?: number; // Border width
  backgroundColor?: string; // Background color for placeholder
  textColor?: string; // Text color for placeholder
  onPress?: () => void; // Optional click handler
  style?: ViewStyle; // Additional custom styles
};

export const Avatar: React.FC<AvatarProps> = ({
  imageUrl,
  placeholder,
  size = Size.Medium,
  shape = Shape.Circle,
  showBorder = false,
  borderColor = '#ddd',
  borderWidth = 1,
  backgroundColor = '#ccc',
  textColor = '#fff',
  onPress,
  style,
}) => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const styles = getAvatarStyles(theme, size, shape);
  const isImageAvailable = !!imageUrl;
  const initials = getInitials(placeholder);

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <Column
        alignItems={FlexAlignItems.Center}
        justifyContent={FlexJustifyContent.Center}
        style={[
          styles.avatar,
          {
            borderColor: showBorder ? borderColor : theme.colors.transparent,
            borderWidth: showBorder ? borderWidth : 0,
            backgroundColor: isImageAvailable ? theme.colors.transparent : backgroundColor,
          },
          style,
        ]}
      >
        {isImageAvailable ? (
          <Image source={imageUrl} style={[styles.image]} />
        ) : (
          <Typography
            variant={TypographyVariant.Body}
            fontFamilyStyle={Fonts.Montserrat_Bold}
            style={[
              styles.placeholderText,
              {
                color: textColor,
              },
            ]}
          >
            {initials}
          </Typography>
        )}
      </Column>
    </TouchableOpacity>
  );
};