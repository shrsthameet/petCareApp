import React from 'react';
import {
  TouchableOpacity,
  ViewStyle
} from 'react-native';
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
  Fonts, Shape, Size, TypographyVariant 
} from '@/utils/enum';

type AvatarProps = {
  imageUrl?: string; // URL for the avatar image
  placeholder?: string; // Placeholder text (e.g., initials)
  size?: SizeType; // Diameter of the avatar
  shape?: ShapeType; // Diameter of the avatar
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
          <Image
            source={imageUrl}
            style={[
              styles.image
            ]}
          />
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
            {placeholder?.slice(0, 2).toUpperCase()}
          </Typography>
        )}
      </Column>
    </TouchableOpacity>
  );
};
