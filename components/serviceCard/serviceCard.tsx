import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Column } from '../CoreUI/Flex';
import { Icon } from '../CoreUI/Icons';
import { Typography } from '../CoreUI/Typography';
import { getServiceCardStyles } from './serviceCard.style';
import {
  FlexJustifyContent, FlexAlignItems, TypographyVariant, Size, Fonts 
} from '@/utils/enum';
import { RootState } from '@/redux/rootReducer';
import { IconLibraries } from '@/utils/types';

interface IServiceCardProps {
  iconName: string;
  iconLibraryName: keyof typeof IconLibraries | 'AntDesign';
  title: string;
}

export const ServiceCard: FC<IServiceCardProps> = ({
  iconName,
  iconLibraryName,
  title
}) => {
  const { theme } = useSelector((state: RootState) => state.theme);

  const styles = getServiceCardStyles(theme);
  return (
    <Column justifyContent={FlexJustifyContent.Between} alignItems={FlexAlignItems.Center}>
      <Column justifyContent={FlexJustifyContent.Center} alignItems={FlexAlignItems.Center} style={styles.iconContainer}>
        <Icon name={iconName} library={iconLibraryName} size={24} color={theme.colors.onPrimaryContainer} />
      </Column>
      <Typography variant={TypographyVariant.Caption} size={Size.Large} fontFamilyStyle={Fonts.Montserrat_Medium}>
        {title}
      </Typography>
    </Column>
  );
};
