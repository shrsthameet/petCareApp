import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { createReminderStyles } from './reminderCard.style';
import { Column, Row } from '@/components/CoreUI/Flex';
import {
  FlexJustifyContent, Fonts, Size, TypographyVariant 
} from '@/utils/enum';
import { RootState } from '@/redux/rootReducer';
import { Icon } from '@/components/CoreUI/Icons';
import { Typography } from '@/components/CoreUI/Typography';

interface IReminderCardProps {
  background?: string;
}

export const ReminderCard: FC<IReminderCardProps> = ({ background }) => {
  const { theme } = useSelector((state: RootState) => state.theme);

  const customStyles = createReminderStyles(theme);
  return (
    <Row justifyContent={FlexJustifyContent.Between} alignItems='center' style={[customStyles.reminderContainer, { 
      backgroundColor: background ? background : theme.colors.primary
    }]}>
      <Column gap={30}>
        <Row alignItems='center' gap={10}>
          <Icon library='FontAwesome' name='stethoscope' color={theme.colors.onPrimary} size={20} />
          <Typography variant={TypographyVariant.Title} size={Size.Medium} color={theme.colors.onPrimary} fontFamilyStyle={Fonts.Montserrat_SemiBold}>
            Vaccination
          </Typography>
        </Row>

        <Row alignItems='center' justifyContent='center' gap={15}>
          <Row>
            <Icon library='MaterialCommunityIcons' name='alarm' color={theme.colors.onPrimary} size={15} />
            <Typography variant={TypographyVariant.Caption} size={Size.Large} color={theme.colors.onPrimary} fontFamilyStyle={Fonts.Montserrat_Medium}>
              09:00 AM
            </Typography>
          </Row>

          <Row>
            <Icon library='AntDesign' name='calendar' color={theme.colors.onPrimary} size={15} />
            <Typography variant={TypographyVariant.Body} size={Size.Small} color={theme.colors.onPrimary} fontFamilyStyle={Fonts.Montserrat_Medium}>
              14 November, 2024
            </Typography>
          </Row>
        </Row>

      </Column>

      <Column>
        <Icon library='Fontisto' name='injection-syringe' color={theme.colors.onPrimary} size={45} />
      </Column>
    </Row>
  );
};