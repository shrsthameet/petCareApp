import React, { FC } from 'react';
import { View, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Column } from '@/components/CoreUI/Flex';
import { Typography } from '@/components/CoreUI/Typography';

interface IPetBioComponentProps {
  show?: boolean;
  date?: any;
  showMode?: () => void;
  handleChange?: (event, selectedDate) => void;
}

export const PetBioComponent: FC<IPetBioComponentProps> = ({
  show,
  date,
  showMode,
  handleChange,
}) => {
  return (
    <Column style={{
      marginTop: 40 
    }}>
      <Typography>Pet bio</Typography>
      <View style={{
        padding: 20 
      }}>
        <Button title='Show Date Picker' onPress={showMode} />
        {show && (
          <DateTimePicker
            value={date}
            mode='date' // Choose 'date', 'time', or 'datetime'
            display='default' // Options: 'default', 'spinner', 'calendar', 'clock'
            onChange={handleChange}
          />
        )}
        <Typography style={{
          marginTop: 20 
        }}>
          Selected Date: {date.toLocaleDateString()}
        </Typography>
      </View>
    </Column>
  );
};
