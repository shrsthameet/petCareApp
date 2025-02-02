import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useNavigation, useRouter } from 'expo-router';
import { Alert, Text } from 'react-native';
import { PetTypeBreed } from '@/screens/petProfileSetUp';
import { globalStyles } from '@/styles/global';
import { RootState } from '@/redux/rootReducer';
import { ErrorResponse, FormValueType } from '@/utils/types';
import {
  ButtonTitle, ButtonVariant, IconLibraryName, Position 
} from '@/utils/enum';
import { Button } from '@/components/CoreUI/Button';
import { ROUTES } from '@/utils/types/routesType';
import { useGetAllPetBreedsQuery, useGetAllPetTypesQuery } from '@/redux/petSlice/petsApi';
import { PetType } from '@/utils/types/petType';
import { PetBreed } from '@/utils/types/petBreedsType';
import { useCreateUserPetProfilesMutation } from '@/redux/uersPetProfileSlice/userPetProfileApi';
import { isFetchBaseQueryError } from '@/utils/types/appUtils';

interface IInitialState {
  allPetTypes: any,
  allPetBreeds: any,
  selectedPetType: string;
  selectedPetBreed: string;
  step: number;
}

const PetTypeAndBreed = () => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const { user } = useSelector((state: RootState) => state.auth);
  // const dispatch = useDispatch<AppDispatch>();

  const [initialState, setInitialState] = useState<IInitialState>({
    allPetTypes: [],
    allPetBreeds: [],
    selectedPetType: 'all',
    selectedPetBreed: '',
    step: 1
  });

  const {
    allPetTypes,
    allPetBreeds,
    selectedPetType,
    selectedPetBreed,
    step
  } = initialState;

  const {
    isLoading: isAllPetTypesLoading,
    data: allPetTypesData,
    isError: isAllPetTypesError,
    // error: allPetTypesError
  } = useGetAllPetTypesQuery('');

  const {
    isLoading: isAllPetBreedsLoading,
    data: allPetBreedsData,
    isError: isAllPetBreedsError,
    // error: allPetBreedsError
  } = useGetAllPetBreedsQuery({
  });

  const [createUserPetProfiles] = useCreateUserPetProfilesMutation();

  const router = useRouter();
  const navigation = useNavigation();

  // Single change handler
  const handleChange = (name: string, value: FormValueType) => {
    console.log(name, value);
    setInitialState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    const petProfileData = {
      userId: user._id,
      petType: selectedPetType,
      petBreed: selectedPetBreed,
      step
    };
    try {
      const result = await createUserPetProfiles(petProfileData).unwrap();
      if (result.success) {
        router.push(ROUTES.PET_PROFILE_SETUP.PET_BIO); // Uncomment if router is properly defined
      }
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const data = error.data as ErrorResponse;
        Alert.alert('Error', data.error || data.message || 'Something went wrong');
      } else {
        Alert.alert('Error', 'An unexpected error occurred');
      }
    }
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
          onPress={handleSubmit}
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
  }, [navigation, selectedPetType, selectedPetBreed]);

  useEffect(() => {
    if (isAllPetTypesError && isAllPetBreedsError) {
      Alert.alert('Error', 'Something went wrong. Please try again later!');
    }
    if (isAllPetTypesError || isAllPetBreedsError) {
      console.log('inside isAllPetTypesError || isAllPetBreedsError', isAllPetTypesError);
      Alert.alert('Error', 'some error');
    }
  }, [isAllPetTypesError, isAllPetBreedsError]);

  useEffect(() => {
    if (allPetTypesData && allPetTypesData.length) {
      const petLists = [
        {
          label: 'All', value: 'all' 
        }, // Add 'All' option first
        ...allPetTypesData.map((item: PetType) => ({
          label: item.name,
          value: item._id
        }))
      ];
      setInitialState((prevState) => ({
        ...prevState,
        allPetTypes: petLists
      }));
    }
    if (allPetBreedsData && allPetBreedsData.length) {
      const petBreeds = allPetBreedsData.map((item: PetBreed) => ({
        petTypeId: item.petType._id,
        label: item.name,
        value: item._id,
        imgSrc: item.image
      }));
      setInitialState((prevState) => ({
        ...prevState,
        allPetBreeds: petBreeds
      }));
    }
  }, [allPetTypesData, allPetBreedsData]);

  useEffect(() => {
    let currentPetBreedList: any;
    if (selectedPetType === 'all') {
      currentPetBreedList = allPetBreedsData ? allPetBreedsData?.map((item: PetBreed) => ({
        petTypeId: item.petType._id,
        label: item.name,
        value: item._id,
        imgSrc: item.image
      })) : [];
    } else {
      currentPetBreedList = allPetBreedsData ? allPetBreedsData?.filter((item: any) => 
        item.petType._id === selectedPetType).map((item) => ({
        label: item.name,
        value: item._id,
        petTypeId: item.petType._id,
        imgSrc: item.image
      })) : [];
    }
    setInitialState((prevState) => ({
      ...prevState,
      allPetBreeds: currentPetBreedList
    }));
  }, [selectedPetType]);

  return (
    <SafeAreaView style={globalStyles.container}>
      {isAllPetBreedsLoading && isAllPetTypesLoading ? <Text>Loading</Text> : (
        <PetTypeBreed
          theme={theme}
          petTypeList={allPetTypes}
          petBreedList={allPetBreeds}
          selectedPetBreed={selectedPetBreed}
          selectedPetType={selectedPetType}
          handleChange={handleChange}
        />
      )}
    </SafeAreaView>
  );
};

export default PetTypeAndBreed;