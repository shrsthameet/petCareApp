import React from 'react';
import { useSelector } from 'react-redux';
import { createReminderStyles } from './reminderCard.style';
import { Column, Row } from '@/components/CoreUI/Flex';
import { FlexJustifyContent, Size, TypographyVariant } from '@/utils/enum';
import { RootState } from '@/redux/rootReducer';
import { Icon } from '@/components/CoreUI/Icons';
import { Typography } from '@/components/CoreUI/Typography';

export const ReminderCard = () => {
  const { theme } = useSelector((state: RootState) => state.theme);

  const customStyles = createReminderStyles(theme);
  return (
    <Row justifyContent={FlexJustifyContent.Between} alignItems='center' style={customStyles.reminderContainer}>
      <Column gap={30}>
        <Row alignItems='center' gap={10}>
          <Icon library='FontAwesome' name='stethoscope' color={theme.colors.onPrimary} size={28} />
          <Typography variant={TypographyVariant.Title} size={Size.Large} color={theme.colors.onPrimary} fontWeight={500}>
            Vaccination
          </Typography>
        </Row>

        <Row alignItems='center' justifyContent='center' gap={15}>
          <Row>
            <Icon library='MaterialCommunityIcons' name='alarm' color={theme.colors.onPrimary} size={15} />
            <Typography variant={TypographyVariant.Body} size={Size.Small} color={theme.colors.onPrimary} fontWeight={500}>
              09:00 AM
            </Typography>
          </Row>

          <Row>
            <Icon library='AntDesign' name='calendar' color={theme.colors.onPrimary} size={15} />
            <Typography variant={TypographyVariant.Body} size={Size.Small} color={theme.colors.onPrimary} fontWeight={500}>
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