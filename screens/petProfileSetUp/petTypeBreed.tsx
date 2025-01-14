import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getPetProfileSetupStyles } from './petProfileSetup.style';
import { Column, Row } from '@/components/CoreUI/Flex';
import { Select } from '@/components/CoreUI/Select';
import { Typography } from '@/components/CoreUI/Typography';
import { RootState } from '@/redux/rootReducer';
import { Size, TypographyVariant } from '@/utils/enum';
import Lab from '@/assets/images/lab.jpg';
import Ginger from '@/assets/images/ginger.jpg';
import { PetBreedsAvatar } from '@/components/petBreedsAvatar';

interface IInitialState {
  selectedPetType: string;
  selectedPetBreed: string;
}

export const PetTypeBreed = () => {
  const { theme } = useSelector((state: RootState) => state.theme);

  const [initialState, setInitialState] = useState<IInitialState>({
    selectedPetType: '',
    selectedPetBreed: '',
  });

  const { selectedPetType, selectedPetBreed } = initialState;

  // Single change handler
  const handleChange = (name: keyof typeof initialState, value: string | string [] | null) => {
    setInitialState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const styles = getPetProfileSetupStyles(theme);
  return (
    <Column flex={1} style={styles.container}>
      <Column flex={1} gap={20}>

        <Column gap={10}>
          <Typography variant={TypographyVariant.Body} size={Size.Medium} style={{
            paddingHorizontal: 5
          }}>
            I have a
          </Typography>
          <Select
            options={[{
              label: 'Dog', value: 'dog'
            }, {
              label: 'Cat', value: 'cat'
            }, {
              label: 'Bird', value: 'bird'
            }]}
            selectedValue={selectedPetType}
            placeholder='Select your pet type'
            onSelect={(value) => handleChange('selectedPetType', value)}
          />
        </Column>

        <Column gap={15}>
          <Typography variant={TypographyVariant.Body} size={Size.Medium} style={{
            paddingHorizontal: 5
          }}>
            My {selectedPetType ? selectedPetType : 'pet'} is
          </Typography>

          <Row gap={15}>
            <PetBreedsAvatar 
              petImgURL={Lab}
              handlePress={() => console.log('Labrador')}
              showText={true}
              avatarTitle={'Labrador'}
            />

            <PetBreedsAvatar 
              petImgURL={Ginger}
              handlePress={() => console.log('Ginger')}
              showText={true}
              avatarTitle={'Ginger'}
            />
          </Row>
        </Column>
      </Column>
    </Column>
  );
};
