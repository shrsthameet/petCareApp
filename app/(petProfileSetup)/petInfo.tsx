import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useNavigation, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert } from 'react-native';
import { globalStyles } from '@/styles/global';
import { RootState } from '@/redux/rootReducer';
import { PetInfoComponent } from '@/screens/petProfileSetUp';
import { ErrorResponse } from '@/utils/types';
import { Button } from '@/components/CoreUI/Button';
import {
  ButtonTitle, ButtonVariant, IconLibraryName, Position 
} from '@/utils/enum';
import { ROUTES } from '@/utils/types/routesType';
import { PetInfoFormSchema } from '@/utils/validations';
import { isFetchBaseQueryError, nuteredOptionList } from '@/utils/types/appUtils';
import { ErrMsg } from '@/utils/constants';
import { useCreateUserPetProfilesMutation, useGetUserPetProfilesQuery } from '@/redux/uersPetProfileSlice/userPetProfileApi';

const PetInfo = () => {
  const { theme } = useSelector((state:RootState) => state.theme);
  const { user } = useSelector((state: RootState) => state.auth);

  const router = useRouter();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { isDirty, errors },
    reset,
  } = useForm<z.infer<typeof PetInfoFormSchema>>({
    resolver: zodResolver(PetInfoFormSchema), defaultValues: {
      isSterilised: false,
      chipNumber: '',
      step: 3
    }
  });

  const {
    isLoading: isUserPetProfilesLoading,
    data: userPetProfilesData,
    // isError: isUserPetProfilesError,
    // error: userPetProfilesError
  } = useGetUserPetProfilesQuery(user._id);
  
  const [createUserPetProfiles] = useCreateUserPetProfilesMutation();

  const onSubmit = async (data: any) => {
    if (isDirty) {
      const petInfoData = {
        userId: user._id,
        isSterilised: data.isSterilised,
        chipNumber: data.chipNumber,
        step: 3
      };
      console.log('petBioData', petInfoData);
      try {
        const formData = new FormData();
  
        // Append object properties to FormData
        Object.keys(petInfoData).forEach((key) => {
          const value = petInfoData[key as keyof typeof petInfoData];
          // Check if the value is a File (this is likely for the image field)
          formData.append(key, String(value));
        });
  
        const result = await createUserPetProfiles(formData).unwrap();
        if (result.success) {
          router.push(ROUTES.TABS_ROUTES.HOME);
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
      router.push(ROUTES.TABS_ROUTES.HOME);
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
        reset({
          chipNumber: userPetProfilesData[0].chipNumber,
          isSterilised: userPetProfilesData[0].isSterilised,
        });
      }
    }
  
  }, [isUserPetProfilesLoading, userPetProfilesData]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <PetInfoComponent 
        theme={theme}
        nuteredOptionList={nuteredOptionList}
        control={control}
        errors={errors}
      />
    </SafeAreaView>
  );
};

export default PetInfo;