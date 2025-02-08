import React, { FC } from 'react';
import { Controller } from 'react-hook-form';
import { getPetProfileSetupStyles } from './petProfileSetup.style';
import { PetProfileProgressComponent } from './petProfileProgressComponent';
import { Column, Row } from '@/components/CoreUI/Flex';
import { Select } from '@/components/CoreUI/Select';
import { Typography } from '@/components/CoreUI/Typography';
import { Size, TypographyVariant } from '@/utils/enum';
import { PetBreedsAvatar } from '@/components/petBreedsAvatar';
import { IOptionList, ITheme } from '@/utils/types';
import { FormError } from '@/components/formError/formError';

interface IPetTypeBreedProps {
  theme: ITheme;
  petTypeList: IOptionList[];
  petBreedList: IOptionList[];
  watchPetType: string;
  control: any;
  errors: any;
}

export const PetTypeBreed: FC<IPetTypeBreedProps> = ({
  theme,
  petTypeList,
  petBreedList,
  watchPetType,
  control,
  errors
}) => {
  const styles = getPetProfileSetupStyles(theme);
  return (
    <Column flex={1} style={styles.container}>
      <Column flex={1} gap={20}>

        <PetProfileProgressComponent
          currentStep={1}
          totalStep={3}
          progress={33.33}
        />

        <Column gap={10} style={{
          marginTop: 25 
        }}>
          <Typography variant={TypographyVariant.Body} size={Size.Medium} style={{
            paddingHorizontal: 5
          }}>
            I have a
          </Typography>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <Select
                  options={petTypeList}
                  selectedValue={value}
                  placeholder='Select your pet type'
                  onSelect={(value) => onChange(value)}
                />
              );
            }}
            name='selectedPetType'
          />
          {errors.selectedPetType && <FormError errMsg={errors.selectedPetType.message} />}
        </Column>

        <Column gap={15}>
          <Typography variant={TypographyVariant.Body} size={Size.Medium} style={{
            paddingHorizontal: 5
          }}>
            My {watchPetType === 'all' 
              ? 'pet' 
              : petTypeList.length 
                ? petTypeList.find((item: IOptionList) => item.value === watchPetType)?.label || 'Unknown'
                : 'Unknown'} is
          </Typography>

          <Row gap={15}>
            <Column>
              <Row>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => {
                    return (
                      <>
                        {petBreedList.map((item, index) => (
                          <PetBreedsAvatar
                            key={index}
                            petImgURL={item.imgSrc}
                            handlePress={() => onChange(item.value)}
                            showText={true}
                            avatarTitle={item.label}
                            selected={value === item.value}
                          />
                        ))}
                      </>
                    );
                  }}
                  name='selectedPetBreed'
                />
              </Row>
              {errors.selectedPetBreed && (
                <FormError errMsg={errors.selectedPetBreed.message} />
              )}
            </Column>
          </Row>
        </Column>
      </Column>
    </Column>
  );
};
