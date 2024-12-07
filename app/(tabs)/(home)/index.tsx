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
            Display Lg
          </Typography>
          <Typography variant={TypographyVariant.Display} size={Size.Medium} color={theme.colors.text} fontWeight='700'>
            Display Md
          </Typography>
          <Typography variant={TypographyVariant.Display} size={Size.Small} color={theme.colors.text} fontWeight='700'>
            Display Sm
          </Typography>
        </Column>

        <Column>
          <Typography variant={TypographyVariant.Headline} size={Size.Large} color={theme.colors.text} fontWeight='700'>
            Headline Lg
          </Typography>
          <Typography variant={TypographyVariant.Headline} size={Size.Medium} color={theme.colors.text} fontWeight='700'>
            Headline Md
          </Typography>
          <Typography variant={TypographyVariant.Headline} size={Size.Small} color={theme.colors.text} fontWeight='700'>
            Headline Sm
          </Typography>
        </Column>
      </Column>
    </ScrollView>
  );
}