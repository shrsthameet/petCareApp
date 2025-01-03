import React from 'react';
import { ScrollView } from 'react-native';
import { reminderStyles } from './reminderComponent.style';
import { globalStyles } from '@/styles/global';
import {
  FlexAlignItems, FlexJustifyContent, Fonts, Size, TypographyVariant 
} from '@/utils/enum';
import { Typography } from '@/components/CoreUI/Typography';
import { Column, Row } from '@/components/CoreUI/Flex';
import { ReminderCard } from '@/components/reminderCard';

export const ReminderComponent = () => {
  return (
    <Column gap={10} style={reminderStyles.reminderContainer}>

      <Row justifyContent={FlexJustifyContent.Between} alignItems={FlexAlignItems.Center} style={globalStyles.horizontalPadding}>
        {/* <Link href={buttonLink as Href}> */}
        <Typography variant={TypographyVariant.Title} size={Size.Medium} fontFamilyStyle={Fonts.Montserrat_SemiBold}>
          Reminders
        </Typography>
        {/* <IconButton icon='plus' mode={ButtonVariant.Contained} /> */}
        {/* </Link> */}
      </Row>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Row gap={10} style={globalStyles.horizontalPadding}>
          <ReminderCard  />
          <ReminderCard />
        </Row>
      </ScrollView>

    </Column>
  );
};