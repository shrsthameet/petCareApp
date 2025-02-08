import React, { FC } from 'react';
import { Controller } from 'react-hook-form';
import { getPetProfileSetupStyles } from './petProfileSetup.style';
import { PetProfileProgressComponent } from './petProfileProgressComponent';
import { Column } from '@/components/CoreUI/Flex';
import { Typography } from '@/components/CoreUI/Typography';
import { IOptionList, ITheme } from '@/utils/types';
import { CustomDateTimePicker } from '@/components/CoreUI/CustomDateTimePicker';
import { ImageUpload } from '@/components/CoreUI/ImageUpload';
import { Input } from '@/components/CoreUI/Input';
import { RadioButton } from '@/components/CoreUI/RadioButton';
import { Select } from '@/components/CoreUI/Select';
import {
  TypographyVariant, Size, Shape, FlexDirection,
  DateTimePickerMode
} from '@/utils/enum';
import { IPetBioInitialState } from '@/app/(petProfileSetup)/petBio';
import { FormError } from '@/components/formError/formError';

interface IPetBioComponentProps {
  theme: ITheme;
  imageURI: string;
  watchAdoptionField: string;
  genderList: IOptionList[];
  adoptionlist: IOptionList[];
  setInitialState: any;
  control: any;
  errors: any;
}

export const PetBioComponent: FC<IPetBioComponentProps> = ({
  theme,
  imageURI,
  watchAdoptionField,
  genderList,
  adoptionlist,
  setInitialState,
  control,
  errors,
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
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <ImageUpload
                image={imageURI}
                setImage={(value) => {
                  setInitialState((prevState: IPetBioInitialState) => ({
                    ...prevState,
                    imageURI: value.uri
                  }));
                  onChange(value);
                }}
                title='Upload image'
              />
            )}
            name='image'
          />
        </Column>

        <Column gap={8}>
          <Typography variant={TypographyVariant.Body} size={Size.Small} style={{
            paddingHorizontal: 5
          }}>
              My pet name is
          </Typography>

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <Input
                  value={value}
                  placeholder={'Enter your pet name'}
                  onChangeText={(value) => onChange(value)}
                  shape={Shape.Pill}
                />
              );
            }}
            name='name'
          />
          {errors.name && <FormError errMsg={errors.name.message} />}
        </Column>

        <Column gap={8}>
          <Typography variant={TypographyVariant.Body} size={Size.Small} style={{
            paddingHorizontal: 5
          }}>
            Date of birth
          </Typography>

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomDateTimePicker
                onDateChange={(date) => onChange(date.toISOString())}
                mode={DateTimePickerMode.Date}
              />
            )}
            name='dateOfBirth'
          />
        </Column>

        <Column gap={10}>
          <Typography variant={TypographyVariant.Body} size={Size.Small} style={{
            paddingHorizontal: 5
          }}>
            Gender
          </Typography>

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                options={genderList}
                selectedValue={value}
                placeholder='Select gender'
                onSelect={(value) => onChange( value)}
              />
            )}
            name='gender'
          />
          {errors.gender && <FormError errMsg={errors.gender.message} />}
        </Column>

        <Column>
          <Typography variant={TypographyVariant.Body} size={Size.Small} style={{
            paddingHorizontal: 5
          }}>
            My pet is
          </Typography>

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <RadioButton
                options={adoptionlist}
                selectedValue={value}
                onValueChange={(value) => onChange(value)}
                direction={FlexDirection.Row}
              />
            )}
            name='adoption'
          />
        </Column>

        {watchAdoptionField === 'adopted' ? (
          <Column gap={8}>
            <Typography variant={TypographyVariant.Body} size={Size.Small} style={{
              paddingHorizontal: 5
            }}>
              Date of adoption
            </Typography>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomDateTimePicker
                  onDateChange={(date) => onChange(date.toISOString())}
                  mode={DateTimePickerMode.Date}
                />
              )}
              name='dateOfAdoption'
            />
          </Column>
        ) : null}
      </Column>
    </Column>
  );
};
