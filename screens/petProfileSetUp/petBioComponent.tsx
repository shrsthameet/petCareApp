import React, { FC } from 'react';
import { getPetProfileSetupStyles } from './petProfileSetup.style';
import { PetProfileProgressComponent } from './petProfileProgressComponent';
import { Column } from '@/components/CoreUI/Flex';
import { Typography } from '@/components/CoreUI/Typography';
import { IOptionList, ITheme, FormValueType } from '@/utils/types';
import { CustomDateTimePicker } from '@/components/CoreUI/CustomDateTimePicker';
import { ImageUpload } from '@/components/CoreUI/ImageUpload';
import { Input } from '@/components/CoreUI/Input';
import { RadioButton } from '@/components/CoreUI/RadioButton';
import { Select } from '@/components/CoreUI/Select';
import {
  TypographyVariant, Size, Shape, FlexDirection,
  DateTimePickerMode
} from '@/utils/enum';

interface IPetBioComponentProps {
  theme: ITheme;
  image: string;
  name: string;
  gender: string;
  dateOfBirth: string;
  dateOfAdoption: string;
  adoption: string;
  genderList: IOptionList[];
  adoptionlist: IOptionList[];
  handleChange: (name: string, value: FormValueType) => void;
}

export const PetBioComponent: FC<IPetBioComponentProps> = ({
  theme,
  image,
  name,
  gender,
  dateOfBirth,
  dateOfAdoption,
  adoption,
  genderList,
  adoptionlist,
  handleChange,
}) => {
  const styles = getPetProfileSetupStyles(theme);
  return (
    <Column gap={40} style={styles.container}>

      <PetProfileProgressComponent
        currentStep={2}
        totalStep={3}
        progress={66.66}
      />

      <Column gap={20}>
        <Column>
          <ImageUpload
            image={image}
            setImage={(value) => handleChange('image', value)}
            title='Upload image'
          />
        </Column>

        <Column gap={8}>
          <Typography variant={TypographyVariant.Body} size={Size.Small} style={{
            paddingHorizontal: 5
          }}>
              My pet name is
          </Typography>

          <Input
            value={name}
            placeholder={'Enter your pet name'}
            onChangeText={(value) => handleChange('name', value)}
            shape={Shape.Pill}
          />
        </Column>

        <Column gap={8}>
          <Typography variant={TypographyVariant.Body} size={Size.Small} style={{
            paddingHorizontal: 5
          }}>
              Date of birth
          </Typography>
          <CustomDateTimePicker
            onDateChange={(date) => handleChange('dateOfBirth', date)}
            mode={DateTimePickerMode.Date}
          />
        </Column>

        <Column gap={10}>
          <Typography variant={TypographyVariant.Body} size={Size.Small} style={{
            paddingHorizontal: 5
          }}>
              Gender
          </Typography>
          <Select
            options={genderList}
            selectedValue={gender}
            placeholder='Select gender'
            onSelect={(value) => handleChange('gender', value)}
          />
        </Column>

        <Column>
          <Typography variant={TypographyVariant.Body} size={Size.Small} style={{
            paddingHorizontal: 5
          }}>
              My pet is
          </Typography>
          <RadioButton
            options={adoptionlist}
            selectedValue={adoption}
            onValueChange={(value) => handleChange('adoption', value)}
            direction={FlexDirection.Row}
          />
        </Column>

        {adoption === 'adopted' ? (
          <Column gap={8}>
            <Typography variant={TypographyVariant.Body} size={Size.Small} style={{
              paddingHorizontal: 5
            }}>
              Date of adoption
            </Typography>
            <CustomDateTimePicker
              onDateChange={(date) => handleChange('dateOfBirth', date)}
              mode={DateTimePickerMode.Date}
            />
          </Column>
        ) : null}
      </Column>

    </Column>
  );
};
