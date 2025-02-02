import React, { FC } from 'react';
import { getPetProfileSetupStyles } from './petProfileSetup.style';
import { PetProfileProgressComponent } from './petProfileProgressComponent';
import { Column, Row } from '@/components/CoreUI/Flex';
import { Select } from '@/components/CoreUI/Select';
import { Typography } from '@/components/CoreUI/Typography';
import { Size, TypographyVariant } from '@/utils/enum';
import { PetBreedsAvatar } from '@/components/petBreedsAvatar';
import { IOptionList, ITheme, FormValueType } from '@/utils/types';

interface IPetTypeBreedProps {
  theme: ITheme;
  petTypeList: IOptionList[];
  petBreedList: IOptionList[];
  handleChange: (name: string, value: FormValueType) => void;
  selectedPetType: string;
  selectedPetBreed: string;
}

export const PetTypeBreed: FC<IPetTypeBreedProps> = ({
  theme,
  petTypeList,
  petBreedList,
  handleChange,
  selectedPetType,
  selectedPetBreed
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
          <Select
            options={petTypeList}
            selectedValue={selectedPetType}
            placeholder='Select your pet type'
            onSelect={(value) => handleChange('selectedPetType', value)}
          />
        </Column>

        <Column gap={15}>
          <Typography variant={TypographyVariant.Body} size={Size.Medium} style={{
            paddingHorizontal: 5
          }}>
            My {selectedPetType === 'all' 
              ? 'pet' 
              : petTypeList.length 
                ? petTypeList.find((item: IOptionList) => item.value === selectedPetType)?.label || 'Unknown'
                : 'Unknown'} is
          </Typography>

          <Row gap={15}>
            {petBreedList.map((item, index) => (
              <PetBreedsAvatar
                key={index}
                petImgURL={item.imgSrc}
                handlePress={() => handleChange('selectedPetBreed', item.value)}
                showText={true}
                avatarTitle={item.label}
                selected={selectedPetBreed === item.value}
              />
            ))}
          </Row>
        </Column>
      </Column>
    </Column>
  );
};
