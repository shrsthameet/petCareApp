import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { GreetingHeader } from '@/screens/home/greetingHeader';
import { ReminderComponent } from '@/screens/home/reminderComponent';
import { MyPetsComponent } from '@/screens/home/myPetsComponent';
import { Typography } from '@/components/CoreUI/Typography';
import { toggleTheme } from '@/redux/themeSlice';

export default function HomeScreen() {
  const dispatch = useDispatch();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <GreetingHeader />

      <TouchableOpacity onPress={() => dispatch(toggleTheme())}>
        <Typography>
          Dark mode
        </Typography>
      </TouchableOpacity>

      {/* Reminder Section */}
      <ReminderComponent />

      {/* My pets */}
      <MyPetsComponent />
      {/* <Column gap={15}>
        <Column>
          <Typography variant={TypographyVariant.Display} size={Size.Large} color={theme.colors.text}>
            Display Lg
          </Typography>
          <Typography variant={TypographyVariant.Display} size={Size.Medium} color={theme.colors.text}>
            Display Md
          </Typography>
          <Typography variant={TypographyVariant.Display} size={Size.Small} color={theme.colors.text}>
            Display Sm
          </Typography>
        </Column>

        <Column>
          <Typography variant={TypographyVariant.Headline} size={Size.Large} color={theme.colors.text}>
            Headline Lg
          </Typography>
          <Typography variant={TypographyVariant.Headline} size={Size.Medium} color={theme.colors.text}>
            Headline Md
          </Typography>
          <Typography variant={TypographyVariant.Headline} size={Size.Small} color={theme.colors.text}>
            Headline Sm
          </Typography>
        </Column>

        <Column>
          <Typography variant={TypographyVariant.Title} size={Size.Large} color={theme.colors.text}>
            Title Lg
          </Typography>
          <Typography variant={TypographyVariant.Title} size={Size.Medium} color={theme.colors.text}>
            Title Md
          </Typography>
          <Typography variant={TypographyVariant.Title} size={Size.Small} color={theme.colors.text}>
            Title Sm
          </Typography>
        </Column>

        <Column>
          <Typography variant={TypographyVariant.Body} size={Size.Large} color={theme.colors.text}>
            Body Lg
          </Typography>
          <Typography variant={TypographyVariant.Body} size={Size.Medium} color={theme.colors.text}>
            Body Md
          </Typography>
          <Typography variant={TypographyVariant.Body} size={Size.Small} color={theme.colors.text}>
            Body Sm
          </Typography>
        </Column>

        <Column>
          <Typography variant={TypographyVariant.Caption} size={Size.Large} color={theme.colors.text}>
            Caption Lg
          </Typography>
          <Typography variant={TypographyVariant.Caption} size={Size.Medium} color={theme.colors.text}>
            Caption Md
          </Typography>
          <Typography variant={TypographyVariant.Caption} size={Size.Small} color={theme.colors.text}>
            Caption Sm
          </Typography>
        </Column>
      </Column> */}
    </ScrollView>
  );
}