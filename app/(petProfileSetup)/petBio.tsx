import React, { FC, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { router, useNavigation } from 'expo-router';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { globalStyles } from '@/styles/global';
import { RootState } from '@/redux/rootReducer';
import { ErrorResponse } from '@/utils/types';
import { PetBioComponent } from '@/screens/petProfileSetUp';
import {
  ButtonTitle, ButtonVariant, Position, IconLibraryName 
} from '@/utils/enum';
import { Button } from '@/components/CoreUI/Button';
import { IMAGE_BASE_URL, ROUTES } from '@/utils/types/routesType';
import { useCreateUserPetProfilesMutation, useGetUserPetProfilesQuery } from '@/redux/uersPetProfileSlice/userPetProfileApi';
import { adoptionlist, genderList, isFetchBaseQueryError } from '@/utils/types/appUtils';
import { ErrMsg } from '@/utils/constants';
import { PetBioFormSchema } from '@/utils/validations';

export interface IPetBioInitialState {
  imageURI: string;
  step: number;
}

const PetBio: FC = () => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const { user } = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation();

  const [initialState, setInitialState] = useState<IPetBioInitialState>({
    imageURI: '',
    step: 2
  });

  const { imageURI, step } = initialState;

  const {
    control,
    handleSubmit,
    formState: { isDirty, errors },
    reset,
    watch
  } = useForm<z.infer<typeof PetBioFormSchema>>({
    resolver: zodResolver(PetBioFormSchema), defaultValues: {
      name: '',
      gender: '',
      dateOfBirth: '',
      adoption: 'notAdopted',
      dateOfAdoption: '',
      image: null,
    }
  });

  const watchAdoptionField = watch('adoption');

  const {
    isLoading: isUserPetProfilesLoading,
    data: userPetProfilesData,
    // isError: isUserPetProfilesError,
    // error: userPetProfilesError
  } = useGetUserPetProfilesQuery(user._id);

  const [createUserPetProfiles] = useCreateUserPetProfilesMutation();

  const onSubmit = async (data: any) => {
    if (isDirty) {
      const petBioData = {
        userId: user._id,
        image: data.image ? data.image : null,
        name: data.name,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth ? data.dateOfBirth : '',
        dateOfAdoption: data.dateOfAdoption ? data.dateOfAdoption : '',
        step
      };
      try {
        const formData = new FormData();
  
        // Append object properties to FormData
        Object.keys(petBioData).forEach((key) => {
          const value = petBioData[key as keyof typeof petBioData];
          // Check if the value is a File (this is likely for the image field)
          if (key === 'image') {
            if (data.image && typeof data.image === 'object' && 'uri' in data.image) {
              formData.append(key, {
                uri: data.image.uri,
                name: (data.image as any).fileName || `${data.name}.${(data.image as any).mimeType.split('/')[1]}`,
                type: (data.image as any).type, // Ensure correct type
                mimeType: (data.image as any).mimeType, // Ensure correct type
              } as any);
            }
          } else {
            formData.append(key, String(value));
          }
        });
  
        // Send request using your API call
        const result = await createUserPetProfiles(formData).unwrap();
  
        if (result.success) {
          // Uncomment when router is properly defined
          router.push(ROUTES.PET_PROFILE_SETUP.PET_INFO);
        }
      } catch (error) {
        console.log('error', error);
        if (isFetchBaseQueryError(error)) {
          const data = error.data as ErrorResponse;
          Alert.alert('Error', data.error || data.message || ErrMsg.STH_WENT_WRONG);
        } else {
          Alert.alert('Error', ErrMsg.INTERNAL_ERR_MSG);
        }
      }
    } else {
      router.push(ROUTES.PET_PROFILE_SETUP.PET_INFO);
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
    if (!isUserPetProfilesLoading && userPetProfilesData) {
      if (userPetProfilesData.length) {
        const imgURL = userPetProfilesData[0].image ? `${IMAGE_BASE_URL}${userPetProfilesData[0].image}` : '';
        setInitialState((prevState) => ({
          ...prevState,
          imageURI: imgURL,
        }));
        reset({
          name: userPetProfilesData[0].name,
          gender: userPetProfilesData[0].gender,
          dateOfBirth: userPetProfilesData[0].dateOfBirth,
          dateOfAdoption: userPetProfilesData[0].dateOfAdoption,
          adoption: userPetProfilesData[0].dateOfAdoption ? 'adopted' : 'notAdopted',
        });
      }
    }
  
  }, [isUserPetProfilesLoading, userPetProfilesData]);
  
  return (
    <SafeAreaView style={globalStyles.container}>
      <PetBioComponent 
        theme={theme}
        imageURI={imageURI}
        watchAdoptionField={watchAdoptionField}
        genderList={genderList}
        adoptionlist={adoptionlist}
        setInitialState={setInitialState}
        control={control}
        errors={errors}
      />
    </SafeAreaView>
  );
};

export default PetBio;