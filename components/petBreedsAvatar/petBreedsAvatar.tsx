import React, { FC } from 'react';
import { GestureResponderEvent, Pressable } from 'react-native';
import { Avatar } from '../CoreUI/Avatar';
import { Column } from '../CoreUI/Flex';
import { Typography } from '../CoreUI/Typography';
import { FlexAlignItems, Size, TypographyVariant } from '@/utils/enum';
import { SizeType } from '@/utils/types';

interface IPetBreedsAvatar {
  petImgURL?: string;
  avatarSize?: SizeType;
  handlePress: (event: GestureResponderEvent) => void;
  showText?: boolean;
  avatarTitle?: string;
}

export const PetBreedsAvatar: FC<IPetBreedsAvatar> = ({
  petImgURL,
  avatarSize = Size.Medium,
  handlePress,
  showText = false,
  avatarTitle,
}) => {
  return (
    <Pressable onPress={(e) => handlePress(e)}>
      <Column alignItems={FlexAlignItems.Center}>
        <Avatar
          imageUrl={petImgURL}
          size={avatarSize}
        />
        {showText ? (
          <Typography variant={TypographyVariant.Caption} size={Size.Medium}>
            {avatarTitle}
          </Typography>
        ) : null}
      </Column>
    </Pressable>
  );
};
