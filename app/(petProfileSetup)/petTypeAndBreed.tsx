import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useNavigation, useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { PetTypeBreed } from '@/screens/petProfileSetUp';
import { globalStyles } from '@/styles/global';
import { RootState } from '@/redux/rootReducer';
import { ErrorResponse } from '@/utils/types';
import {
  ButtonTitle, ButtonVariant, IconLibraryName, Position 
} from '@/utils/enum';
import { Button } from '@/components/CoreUI/Button';
import { ROUTES } from '@/utils/types/routesType';
import { useGetAllPetBreedsQuery, useGetAllPetTypesQuery } from '@/redux/petSlice/petsApi';
import { PetType } from '@/utils/types/petType';
import { PetBreed } from '@/utils/types/petBreedsType';
import { useCreateUserPetProfilesMutation, useGetUserPetProfilesQuery } from '@/redux/uersPetProfileSlice/userPetProfileApi';
import { isFetchBaseQueryError } from '@/utils/types/appUtils';
import { ErrMsg } from '@/utils/constants';
import { LoadingScreen } from '@/components/CoreUI/LoadingScreen';
import { PetTypeAndBreedSchema } from '@/utils/validations';

interface IInitialState {
  allPetTypes: any,
  allPetBreeds: any,
  step: number;
}

const PetTypeAndBreed = () => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const { user } = useSelector((state: RootState) => state.auth);

  const [initialState, setInitialState] = useState<IInitialState>({
    allPetTypes: [],
    allPetBreeds: [],
    step: 1
  });

  const {
    control,
    handleSubmit,
    formState: { isDirty, errors },
    reset,
    watch
  } = useForm<z.infer<typeof PetTypeAndBreedSchema>>({
    resolver: zodResolver(PetTypeAndBreedSchema), defaultValues: {
      selectedPetType: 'all',
      selectedPetBreed: '',
    }
  });

  const watchPetType = watch('selectedPetType');

  const {
    allPetTypes,
    allPetBreeds,
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

  const {
    isLoading: isUserPetProfilesLoading,
    data: userPetProfilesData,
    // isError: isUserPetProfilesError,
    // error: userPetProfilesError
  } = useGetUserPetProfilesQuery(user._id);

  const [createUserPetProfiles] = useCreateUserPetProfilesMutation();

  const router = useRouter();
  const navigation = useNavigation();

  const onSubmit = async (data: any) => {
    if (isDirty) {
      const petProfileData = {
        userId: user._id,
        petType: data.selectedPetType,
        petBreed: data.selectedPetBreed,
        step
      };
      try {
        const formData = new FormData();
  
        // Append object properties to FormData
        Object.keys(petProfileData).forEach((key) => {
          const value = petProfileData[key as keyof typeof petProfileData];
          // Check if the value is a File (this is likely for the image field)
          formData.append(key, String(value));
        });
  
        const result = await createUserPetProfiles(formData).unwrap();
        if (result.success) {
          router.push(ROUTES.PET_PROFILE_SETUP.PET_BIO); // Uncomment if router is properly defined
        }
      } catch (error) {
        if (isFetchBaseQueryError(error)) {
          const data = error.data as ErrorResponse;
          Alert.alert('Error', data.error || data.message || ErrMsg.STH_WENT_WRONG );
        } else {
          Alert.alert('Error', ErrMsg.INTERNAL_ERR_MSG);
        }
      }
    } else {
      router.push(ROUTES.PET_PROFILE_SETUP.PET_BIO);
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
          onPress={handleSubmit(onSubmit)}
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
  }, [navigation, isDirty]);

  useEffect(() => {
    if (isAllPetTypesError && isAllPetBreedsError) {
      Alert.alert('Error', ErrMsg.STH_WENT_WRONG);
    }
    if (isAllPetTypesError || isAllPetBreedsError) {
      Alert.alert('Error', ErrMsg.INTERNAL_ERR_MSG);
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
    if (watchPetType === 'all') {
      currentPetBreedList = allPetBreedsData ? allPetBreedsData?.map((item: PetBreed) => ({
        petTypeId: item.petType._id,
        label: item.name,
        value: item._id,
        imgSrc: item.image
      })) : [];
    } else {
      currentPetBreedList = allPetBreedsData ? allPetBreedsData?.filter((item: any) => 
        item.petType._id === watchPetType).map((item) => ({
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
  }, [watchPetType]);

  useEffect(() => {
    if (!isUserPetProfilesLoading && userPetProfilesData) {
      if (userPetProfilesData.length) {
        reset({
          selectedPetType: userPetProfilesData[0].petType,
          selectedPetBreed: userPetProfilesData[0].petBreed,
        });
      }
    }

  }, [isUserPetProfilesLoading, userPetProfilesData]);

  return (
    <SafeAreaView style={globalStyles.container}>
      {isAllPetBreedsLoading && isAllPetTypesLoading ? <LoadingScreen /> : (
        <PetTypeBreed
          theme={theme}
          petTypeList={allPetTypes}
          petBreedList={allPetBreeds}
          watchPetType={watchPetType}
          control={control}
          errors={errors}
        />
      )}
    </SafeAreaView>
  );
};

export default PetTypeAndBreed;