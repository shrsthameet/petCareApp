import React from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Typography } from '@/components/CoreUI/Typography';
import { RootState } from '@/redux/rootReducer';
import { Size, TypographyVariant } from '@/utils/enum';
import { Column } from '@/components/CoreUI/Flex';
// import { GreetingHeader } from '@/screens/home/greetingHeader';
// import { ReminderComponent } from '@/screens/home/reminderComponent';

export default function HomeScreen() {
  const { theme } = useSelector((state: RootState) => state.theme);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* <GreetingHeader /> */}

      {/* Reminder Section */}
      {/* <ReminderComponent /> */}

      {/* My pets */}
      {/* <MyPetsComponent /> */}
      <Column gap={15}>
        <Column>
          <Typography variant={TypographyVariant.Display} size={Size.Large} color={theme.colors.text} fontWeight='700'>
            Display Large
          </Typography>
          <Typography variant={TypographyVariant.Display} size={Size.Medium} color={theme.colors.text} fontWeight='700'>
            Display Medium
          </Typography>
          <Typography variant={TypographyVariant.Display} size={Size.Small} color={theme.colors.text} fontWeight='700'>
            Display Small
          </Typography>
        </Column>

        <Column>
          <Typography variant={TypographyVariant.Headline} size={Size.Large} color={theme.colors.text} fontWeight='700'>
            Headline Large
          </Typography>
          <Typography variant={TypographyVariant.Headline} size={Size.Medium} color={theme.colors.text} fontWeight='700'>
            Headline Medium
          </Typography>
          <Typography variant={TypographyVariant.Headline} size={Size.Small} color={theme.colors.text} fontWeight='700'>
            Headline Small
          </Typography>
        </Column>
      </Column>
    </ScrollView>
  );
}