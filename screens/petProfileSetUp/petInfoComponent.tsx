import React, { FC } from 'react';
import { getPetProfileSetupStyles } from './petProfileSetup.style';
import { PetProfileProgressComponent } from './petProfileProgressComponent';
import { Column } from '@/components/CoreUI/Flex';
import { Input } from '@/components/CoreUI/Input';
import { RadioButton } from '@/components/CoreUI/RadioButton';
import { Typography } from '@/components/CoreUI/Typography';
import {
  TypographyVariant, Size, FlexAlignItems, InputMode, Shape, FlexDirection,
  Keyboard
} from '@/utils/enum';
import { FormValueType, IOptionList, ITheme } from '@/utils/types';

interface IPetInfoComponentProps {
  theme: ITheme;
  chipNumber: string;
  isNutered: boolean;
  nuteredOptionList: IOptionList[];
  handleChange: (name: string, value: FormValueType) => void;
}

export const PetInfoComponent: FC<IPetInfoComponentProps> = ({ 
  theme,
  chipNumber,
  isNutered,
  nuteredOptionList,
  handleChange
}) => {
  const styles = getPetProfileSetupStyles(theme);

  return (
    <Column gap={40} style={styles.container}>

      <PetProfileProgressComponent
        currentStep={3}
        totalStep={3}
        progress={100}
      />
    
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
              options={nuteredOptionList}
              selectedValue={isNutered}
              onValueChange={(value) => handleChange('isNutered', value)}
              direction={FlexDirection.Row}
            />
          </Column>
        </Column>
    
      </Column>
    </Column>
  );
};
