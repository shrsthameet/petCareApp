import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Column, Row } from '@/components/CoreUI/Flex';
import { Typography } from '@/components/CoreUI/Typography';
import { globalStyles } from '@/styles/global';
import { getPetProfileSetupStyles } from '@/screens/petProfileSetUp/petProfileSetup.style';
import { RootState } from '@/redux/rootReducer';
import { ProgressBar } from '@/components/CoreUI/ProgressBar';
import {
  FlexAlignItems, FlexDirection, FlexJustifyContent, InputMode, Keyboard, Shape, Size, TypographyVariant 
} from '@/utils/enum';
import { Input } from '@/components/CoreUI/Input';
import { RadioButton } from '@/components/CoreUI/RadioButton';

interface IInitialState {
  isNutered: boolean;
  chipNumber: string;
  step: number;
}

const options = [
  {
    label: 'nutered', value: true
  },
  {
    label: 'not nutered', value: false
  },
];

const PetInfo = () => {
  const { theme } = useSelector((state:RootState) => state.theme);
  const styles = getPetProfileSetupStyles(theme);

  const [initialState, setInitialState] = useState<IInitialState>({
    isNutered: false,
    chipNumber: '',
    step: 3
  });

  const { isNutered, chipNumber } = initialState;

  // Handle change
  const handleChange = (field: string, value: string | boolean) => {
    setInitialState((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <Column gap={40} style={styles.container}>
        <Column gap={10}>
          <ProgressBar progress={100} height={4} />
          <Row justifyContent={FlexJustifyContent.Between}>
            <Typography variant={TypographyVariant.Body} size={Size.Small}>
              Step
            </Typography>
            <Typography variant={TypographyVariant.Body} size={Size.Small}>
              3 / 3
            </Typography>
          </Row>
        </Column>

        <Column gap={25}>

          {/* Title */}
          <Column alignItems={FlexAlignItems.Center}>
            <Typography variant={TypographyVariant.Body} size={Size.Small} textAlign='center' lineHeight={25}>
              Hurray!! Almost there. Last step to get started. Let's get done with it.
            </Typography>
          </Column>

          {/* Form */}
          <Column gap={20}>
            <Column gap={8}>
              <Typography variant={TypographyVariant.Body} size={Size.Small} style={{
                paddingHorizontal: 5
              }}>
              Chip number
              </Typography>
          
              <Input
                inputMode={InputMode.Numeric}
                keyboardType={Keyboard.Numeric}
                value={chipNumber}
                placeholder={'Enter your pet chip number'}
                onChangeText={(value) => handleChange('chipNumber', value)}
                shape={Shape.Pill}
              />
            </Column>

            <Column gap={8}>
              <Typography variant={TypographyVariant.Body} size={Size.Small} style={{
                paddingHorizontal: 5
              }}>
                My pet is
              </Typography>
          
              <RadioButton
                options={options}
                selectedValue={isNutered}
                onValueChange={(value) => handleChange('isNutered', value)}
                direction={FlexDirection.Row}
              />
            </Column>
          </Column>

        </Column>
      </Column>
    </SafeAreaView>
  );
};

export default PetInfo;