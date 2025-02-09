import React from 'react';
import { ScrollView, } from 'react-native';
import { GreetingHeader } from '@/screens/home/greetingHeader';
import { ServicesComponent } from '@/screens/home/servicesComponent';
import { ReminderComponent } from '@/screens/home/reminderComponent';
import { Column } from '@/components/CoreUI/Flex';
import { MyPetsComponent } from '@/screens/home/myPetsComponent';

export default function HomeScreen() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Column gap={30} style={{
        marginBottom: 85,
      }}>
        <GreetingHeader />

        <ServicesComponent />

        {/* Reminder Section */}
        <ReminderComponent />

        {/* My pets */}
        <MyPetsComponent />

      </Column>
    </ScrollView>
  );
}