import React, { FC } from 'react';
import { Controller } from 'react-hook-form';
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
import { IOptionList, ITheme } from '@/utils/types';
import { FormError } from '@/components/formError/formError';

interface IPetInfoComponentProps {
  theme: ITheme;
  nuteredOptionList: IOptionList[];
  control: any;
  errors: any;
}

export const PetInfoComponent: FC<IPetInfoComponentProps> = ({ 
  theme,
  nuteredOptionList,
  control,
  errors,
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

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  inputMode={InputMode.Numeric}
                  keyboardType={Keyboard.Numeric}
                  value={value}
                  placeholder={'Enter your pet chip number'}
                  onChangeText={(value) => onChange(value)}
                  shape={Shape.Pill}
                />
              )}
              name='chipNumber'
            />
          </Column>
    
          <Column gap={8}>
            <Typography variant={TypographyVariant.Body} size={Size.Small} style={{
              paddingHorizontal: 5
            }}>
              My pet is
            </Typography>

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <RadioButton
                  options={nuteredOptionList}
                  selectedValue={value}
                  onValueChange={(value) => onChange(value)}
                  direction={FlexDirection.Row}
                />
              )}
              name='isSterilised'
            />
            {errors.isSterilised && <FormError errMsg={errors.isSterilised.message} />}
          </Column>
        </Column>
    
      </Column>
    </Column>
  );
};
