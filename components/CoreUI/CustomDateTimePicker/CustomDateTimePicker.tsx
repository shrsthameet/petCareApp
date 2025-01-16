import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Button,
  Platform,
  Pressable
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useSelector } from 'react-redux';
import { Column } from '../Flex';
import { Input } from '../Input';
import { Typography } from '../Typography';
import { getCustomDateTimePickerStyles } from './CustomDateTimePicker.style';
import {
  ButtonTitle,
  DateTimePickerDisplay,
  DateTimePickerMode,
  ModalAnimation,
  OSType,
  Shape,
  Size,
  TypographyVariant
} from '@/utils/enum';
import { RootState } from '@/redux/rootReducer';
import { DateTimePickerDisplayType, DateTimePickerModeType } from '@/utils/types';

type DatePickerProps = {
  label?: string;
  placeholder?: string;
  initialDate?: Date;
  onDateChange: (date: Date) => void;
  mode?: DateTimePickerModeType;
  display?: DateTimePickerDisplayType;
};

export const CustomDateTimePicker: React.FC<DatePickerProps> = ({
  label,
  placeholder = 'Select date',
  initialDate = new Date(),
  onDateChange,
  mode = DateTimePickerMode.Date,
  display = Platform.OS === OSType.ANDROID ? DateTimePickerDisplay.Default : DateTimePickerDisplay.Spinner
}) => {
  const { theme } = useSelector((state: RootState) => state.theme);

  const styles = getCustomDateTimePickerStyles(theme);

  const [initialState, setInitialState] = useState({
    date: initialDate,
    tempDate: initialDate, // Temporary state for Android `datetime`
    showPicker: false,
    isTimePickerVisible: false // For Android `datetime`
  });

  const {
    date,
    tempDate,
    showPicker,
    isTimePickerVisible
  } = initialState;

  const formatDisplayValue = (date: Date) => {
    if (mode === DateTimePickerMode.Date) {
      return date.toLocaleDateString(); // Only show the date
    }
    if (mode === DateTimePickerMode.Time) {
      return date.toLocaleTimeString([], {
        hour: '2-digit', minute: '2-digit' 
      }); // Only show the time
    }
    return date.toLocaleString(); // Show both date and time for `datetime`
  };

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setInitialState((prevState) => ({
        ...prevState,
        tempDate: selectedDate
      }));
    }

    if (Platform.OS === OSType.ANDROID) {
      if (mode === DateTimePickerMode.DateTime && !isTimePickerVisible) {
        // Show time picker after date picker
        setInitialState((prevState) => ({
          ...prevState,
          isTimePickerVisible: true
        }));
      } else {
        setInitialState((prevState) => ({
          ...prevState,
          date: selectedDate || tempDate,
          tempDate: selectedDate || tempDate,
          showPicker: false,
          isTimePickerVisible: false
        }));
      }
    }
  };

  const handleConfirm = () => {
    onDateChange(tempDate);
    setInitialState((prevState) => ({
      ...prevState,
      date: tempDate,
      showPicker: false,
    }));
  };

  const handlePress = () => {
    setInitialState((prevState) => ({
      ...prevState,
      showPicker: true,
    }));
    if (mode === DateTimePickerMode.DateTime && Platform.OS === OSType.ANDROID) {
      setInitialState((prevState) => ({
        ...prevState,
        isTimePickerVisible: false,
      }));
    }
  };

  const handleShowPicker = () => {
    setInitialState((prevState) => ({
      ...prevState,
      showPicker: false,
    }));
  };

  return (
    <Column>
      {label && <Typography variant={TypographyVariant.Body} size={Size.Small} style={{
        paddingHorizontal: 5
      }}>
        {label}
      </Typography>}
      <Pressable
        onPress={handlePress}
      >
        <Input
          value={formatDisplayValue(date) || placeholder}
          shape={Shape.Pill}
          editable={true}
          onPress={handlePress}
        />
      </Pressable>

      {showPicker && Platform.OS === OSType.IOS && (
        <Modal
          animationType={ModalAnimation.Slide}
          transparent={true}
          visible={showPicker}
          onRequestClose={handleShowPicker}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={handleShowPicker}
          />
          <View style={styles.bottomSheet}>
            <Text style={styles.modalTitle}>Pick {mode}</Text>
            <DateTimePicker
              value={date}
              mode={mode === DateTimePickerMode.DateTime ? DateTimePickerMode.Date : mode}
              display={display}
              onChange={handleChange}
            />
            <Button title={ButtonTitle.Confirm} onPress={handleConfirm} />
          </View>
        </Modal>
      )}

      {showPicker && Platform.OS === OSType.ANDROID && (
        <>
          {!isTimePickerVisible && (
            <DateTimePicker
              value={tempDate}
              mode={DateTimePickerMode.Date}
              display={display}
              onChange={handleChange}
            />
          )}
          {isTimePickerVisible && (
            <DateTimePicker
              value={tempDate}
              mode={DateTimePickerMode.Time}
              display={display}
              onChange={handleChange}
            />
          )}
        </>
      )}
    </Column>
  );
};

