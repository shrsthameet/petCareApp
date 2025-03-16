import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Column } from '@/components/CoreUI/Flex';
import { Typography } from '@/components/CoreUI/Typography';

export const HealthRecordId = () => {
  const { id } = useLocalSearchParams();
  console.log('pet health record id', id);
  return (
    <Column>
      <Typography>HealthRecordId</Typography>
    </Column>
  );
};
