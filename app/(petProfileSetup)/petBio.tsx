import React, { FC, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { router, useNavigation } from 'expo-router';
import { globalStyles } from '@/styles/global';
import { RootState } from '@/redux/rootReducer';
import { FormValueType, RoutesType } from '@/utils/types';
import { PetBioComponent } from '@/screens/petProfileSetUp';
import {
  ButtonTitle, ButtonVariant, Position, IconLibraryName 
} from '@/utils/enum';
import { Button } from '@/components/CoreUI/Button';
import { ROUTES } from '@/utils/types/routesType';

interface IInitialState {
  name: string;
  gender: string;
  dateOfBirth: string;
  dateOfAdoption: string;
  image: string;
  adoption: string;
  step: number;
}

const adoptionlist = [
  {
    label: 'Adopted', value: 'adopted' 
  },
  {
    label: 'Not adopted', value: 'notAdopted' 
  },
];

const genderList = [
  {
    label: 'Male', value: 'male'
  }, 
  {
    label: 'Female', value: 'female'
  }
];

const PetBio: FC = () => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const navigation = useNavigation();

  const [initialState, setInitialState] = useState<IInitialState>({
    name: '',
    gender: '',
    dateOfBirth: '',
    dateOfAdoption: '',
    image: '',
    adoption: 'notAdopted',
    step: 2
  });

  const { name, gender, dateOfBirth, dateOfAdoption, image, adoption, step } = initialState;

  // Handle change
  const handleChange = (field: string, value: FormValueType) => {
    console.log(field, value);
    setInitialState((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleSubmit = (link: RoutesType) => {
    const petBioData = {
      image,
      name,
      gender,
      dateOfBirth,
      dateOfAdoption,
      step
    };
    console.log('petBioData', petBioData);
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
          onPress={() => handleSubmit(ROUTES.PET_PROFILE_SETUP.PET_INFO)}
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
      <PetBioComponent 
        theme={theme}
        image={image}
        name={name}
        gender={gender}
        dateOfBirth={dateOfBirth}
        dateOfAdoption={dateOfAdoption}
        adoption={adoption}
        genderList={genderList}
        adoptionlist={adoptionlist}
        handleChange={handleChange}
      />
    </SafeAreaView>
  );
};

export default PetBio;