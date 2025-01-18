import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useNavigation, useRouter } from 'expo-router';
import { PetTypeBreed } from '@/screens/petProfileSetUp';
import { globalStyles } from '@/styles/global';
import { RootState } from '@/redux/rootReducer';
import Lab from '@/assets/images/lab.jpg';
import Ginger from '@/assets/images/ginger.jpg';
import { FormValueType, RoutesType } from '@/utils/types';
import {
  ButtonTitle, ButtonVariant, IconLibraryName, Position 
} from '@/utils/enum';
import { Button } from '@/components/CoreUI/Button';
import { ROUTES } from '@/utils/types/routesType';

const petBreedList = [
  {
    imgSrc: Lab,
    label: 'Labrador',
    value: 'labrador'
  },
  {
    imgSrc: Ginger,
    label: 'Ginger',
    value: 'ginger'
  },
];

const petTypeList = [{
  label: 'Dog', value: 'dog'
}, {
  label: 'Cat', value: 'cat'
}, {
  label: 'Bird', value: 'bird'
}];

interface IInitialState {
  selectedPetType: string;
  selectedPetBreed: string;
  step: number;
}

const PetTypeAndBreed = () => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const router = useRouter();
  const navigation = useNavigation();
  
  const [initialState, setInitialState] = useState<IInitialState>({
    selectedPetType: '',
    selectedPetBreed: '',
    step: 1
  });
  
  const { selectedPetType, selectedPetBreed, step } = initialState;

  // Single change handler
  const handleChange = (name: string, value: FormValueType) => {
    setInitialState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (link: RoutesType) => {
    const petProfileData = {
      petType: selectedPetType,
      petBreed: selectedPetBreed,
      step
    };
    console.log('petProfileData', petProfileData);
    router.push(link);
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          title={ButtonTitle.Previous}
          variant={ButtonVariant.Text}
          onPress={() => router.back()}
          showIcon={true}
          iconPosition={Position.Left}
          iconName='chevron-back'
          iconLibrary={IconLibraryName.Ionicons}
          iconSize={20}
          style={{
            paddingHorizontal: 0,
          }}
        />
      ),
      headerRight: () => (
        <Button
          title={ButtonTitle.Next}
          variant={ButtonVariant.Text}
          onPress={() => handleSubmit(ROUTES.PET_PROFILE_SETUP.PET_BIO)}
          showIcon={true}
          iconPosition={Position.Right}
          iconName='chevron-forward'
          iconLibrary={IconLibraryName.Ionicons}
          iconSize={20}
          style={{
            paddingHorizontal: 0,
          }}
        />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <PetTypeBreed
        theme={theme}
        petTypeList={petTypeList}
        petBreedList={petBreedList}
        selectedPetBreed={selectedPetBreed}
        selectedPetType={selectedPetType}
        handleChange={handleChange}
      />
    </SafeAreaView>
  );
};

export default PetTypeAndBreed;