import React, { FC } from 'react';
import { Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { Avatar } from '../CoreUI/Avatar';
import { Column } from '../CoreUI/Flex';
import { Typography } from '../CoreUI/Typography';
import { FlexAlignItems, Size, TypographyVariant } from '@/utils/enum';
import { SizeType } from '@/utils/types';
import { RootState } from '@/redux/rootReducer';
import { IMAGE_BASE_URL } from '@/utils/types/routesType';

interface IPetBreedsAvatar {
  petImgURL?: string;
  avatarSize?: SizeType;
  // handlePress: (event: GestureResponderEvent) => void;
  handlePress: () => void;
  showText?: boolean;
  avatarTitle?: string;
  selected?: boolean;
}

export const PetBreedsAvatar: FC<IPetBreedsAvatar> = ({
  petImgURL,
  avatarSize = Size.Medium,
  handlePress,
  showText = false,
  avatarTitle,
  selected
}) => {
  const { theme } = useSelector((state: RootState) => state.theme);

  return (
    <Pressable onPress={() => handlePress()}>
      <Column alignItems={FlexAlignItems.Center}>
        <Avatar
          imageUrl={`${IMAGE_BASE_URL}${petImgURL}`}
          size={avatarSize}
          showBorder={selected ? true : false}
          borderWidth={selected ? 2 : 0}
          borderColor={selected ? theme.colors.primary : theme.colors.transparent}
        />
        {showText ? (
          <Typography variant={TypographyVariant.Caption} size={Size.Medium} color={selected ? theme.colors.primary : theme.colors.onText}>
            {avatarTitle}
          </Typography>
        ) : null}
      </Column>
    </Pressable>
  );
};
