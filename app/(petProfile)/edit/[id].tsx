import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, useLocalSearchParams } from 'expo-router';
import { useSelector } from 'react-redux';
import { Button } from '@/components/CoreUI/Button';
import { Column } from '@/components/CoreUI/Flex';
import { ImageUpload } from '@/components/CoreUI/ImageUpload';
import { Typography } from '@/components/CoreUI/Typography';
import { globalStyles } from '@/styles/global';
import {
  Shape,
  ButtonTitle,
  ButtonVariant,
  ColorVariant,
  Size,
  TypographyVariant,
  DateTimePickerMode,
  FlexDirection,
  InputMode,
  Keyboard,
  Position
} from '@/utils/enum';
import { Input } from '@/components/CoreUI/Input';
import { PetProfileUpdateSchema } from '@/utils/validations';
import { FormError } from '@/components/formError/formError';
import { Select } from '@/components/CoreUI/Select';
import {
  adoptionlist, genderList, isFetchBaseQueryError, nuteredOptionList 
} from '@/utils/types/appUtils';
import { CustomDateTimePicker } from '@/components/CoreUI/CustomDateTimePicker';
import { RadioButton } from '@/components/CoreUI/RadioButton';
import { IMAGE_BASE_URL, ROUTES } from '@/utils/types/routesType';
import { useGetAllPetBreedsQuery, useGetAllPetTypesQuery } from '@/redux/petSlice/petsApi';
import { PetType } from '@/utils/types/petType';
import { PetBreed } from '@/utils/types/petBreedsType';
import { useDeleteUserPetProfileMutation, useGetPetProfileByIdQuery, useUpdateUserPetProfileMutation } from '@/redux/uersPetProfileSlice/userPetProfileApi';
import { ErrorResponse } from '@/utils/types';
import { ErrMsg } from '@/utils/constants';
import { RootState } from '@/redux/rootReducer';
import { useToast } from '@/context/ToastContext';

interface IFormState {
  description: string;
  imageURI: string;
}

const EditPet = () => {
  const { id } = useLocalSearchParams();
  const { isLoading: isPetProfileLoading, data: petProfileData } = useGetPetProfileByIdQuery(id);
  const { user } = useSelector((state: RootState) => state.auth);
  const { showToast } = useToast();

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

  const [updateUserPetProfiles] = useUpdateUserPetProfileMutation();
  const [deleteUserPetProfiles, { isLoading }] = useDeleteUserPetProfileMutation();

  const [formState, setFormState] = useState<IFormState>({
    imageURI: '',
    description: ''
  });

  const {
    control,
    handleSubmit,
    formState: { isDirty, errors },
    reset,
    watch
  } = useForm<z.infer<typeof PetProfileUpdateSchema>>({
    resolver: zodResolver(PetProfileUpdateSchema), defaultValues: {
      name: '',
      gender: '',
      dateOfBirth: '',
      selectedPetType: '',
      selectedPetBreed: '',
      adoption: 'notAdopted',
      dateOfAdoption: '',
      image: null,
      isSterilised: false,
      chipNumber: '',
    }
  });

  const watchAdoptionField = watch('adoption');
  const watchSelectedPetType = watch('selectedPetType');

  const onSubmit = async (data: any) => {
    if (isDirty) {
      const updatedPetData = {
        image: data.image ? data.image : null,
        name: data.name,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth ? data.dateOfBirth : '',
        dateOfAdoption: data.dateOfAdoption ? data.dateOfAdoption : '',
        chipNumber: data.chipNumber,
        isSterilised: data.isSterilised,
        petType: data.selectedPetType,
        petBreed: data.selectedPetBreed,
        userId: user._id,
      };
      try {
        const formData = new FormData();
  
        // Append object properties to FormData
        Object.keys(updatedPetData).forEach((key) => {
          const value = updatedPetData[key as keyof typeof updatedPetData];
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
        const result = await updateUserPetProfiles({
          petProfileId: id,
          petProfileData: formData,
        }).unwrap();

        if (result.success) {
          // Uncomment when router is properly defined
          showToast(result.message, ColorVariant.Success, 3000, Position.Top);
        }
      } catch (error) {
        if (isFetchBaseQueryError(error)) {
          const data = error.data as ErrorResponse;
          Alert.alert('Error', data.error || data.message || ErrMsg.STH_WENT_WRONG);
        } else {
          Alert.alert('Error', ErrMsg.INTERNAL_ERR_MSG);
        }
      }
    }
  };

  // Single change handler
  const handleChange = (name: keyof typeof formState, value: string | string [] | null) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const onDelete = async () => {
    try {
      const result = await deleteUserPetProfiles(id).unwrap();
      if (result.success) {
        showToast(result.message, ColorVariant.Success, 3000, Position.Top);
        router.push(ROUTES.TABS_ROUTES.HOME);
      }
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const data = error.data as ErrorResponse;
        Alert.alert('Error', data.error || data.message || ErrMsg.STH_WENT_WRONG);
      } else {
        Alert.alert('Error', ErrMsg.INTERNAL_ERR_MSG);
      }
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Are you sure?',
      'This action is ireversible and you will loose your current pet profile.',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Delete',
          onPress: onDelete,
          style: 'destructive'
        }
      ]
    );
  };

  useEffect(() => {
    if (isAllPetTypesError && isAllPetBreedsError) {
      Alert.alert('Error', ErrMsg.STH_WENT_WRONG);
    }
    if (isAllPetTypesError || isAllPetBreedsError) {
      Alert.alert('Error', ErrMsg.INTERNAL_ERR_MSG);
    }
  }, [isAllPetTypesError, isAllPetBreedsError]);

  useEffect(() => {
    if (!isPetProfileLoading && petProfileData) {
      if (petProfileData) {
        const imgURL = petProfileData.image ? `${IMAGE_BASE_URL}${petProfileData.image}` : '';
        setFormState((prevState) => ({
          ...prevState,
          imageURI: imgURL,
        }));
        reset({
          name: petProfileData.name,
          gender: petProfileData.gender,
          dateOfBirth: petProfileData.dateOfBirth,
          dateOfAdoption: petProfileData.dateOfAdoption,
          adoption: petProfileData.dateOfAdoption ? 'adopted' : 'notAdopted',
          chipNumber: petProfileData.chipNumber,
          isSterilised: petProfileData.isSterilised,
          selectedPetType: petProfileData.petType._id,
          selectedPetBreed: petProfileData.petBreed._id,
        });
      }
    }

  }, [isPetProfileLoading, petProfileData]);

  return (
    <ScrollView>
      <Column gap={20} style={[globalStyles.horizontalPadding, styles.container, {
        paddingBottom: 100 
      } ]}>
        <Column alignItems='center'>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <ImageUpload
                image={formState.imageURI}
                setImage={(value) => onChange(value)}
              />
            )}
            name='image'
          />
        </Column>

        <Column>
          <Typography variant={TypographyVariant.Body} size={Size.Small}>Name:</Typography>
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

        <Column>
          <Typography variant={TypographyVariant.Body} size={Size.Small} style={{
            paddingHorizontal: 5
          }}>
            Pet type
          </Typography>

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => {
              let petTypesList;
              if (!isAllPetTypesLoading && allPetTypesData && allPetTypesData.length) {
                petTypesList = [
                  ...allPetTypesData.map((item: PetType) => ({
                    label: item.name,
                    value: item._id
                  }))
                ];
              }
              return (
                <Select
                  options={petTypesList || []}
                  selectedValue={value}
                  placeholder='Select gender'
                  onSelect={(value) => onChange(value)}
                />
              );
            }}
            name='selectedPetType'
          />
          {errors.selectedPetType && <FormError errMsg={errors.selectedPetType.message} />}
        </Column>

        <Column>
          <Typography variant={TypographyVariant.Body} size={Size.Small} style={{
            paddingHorizontal: 5
          }}>
            Pet breed
          </Typography>

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => {
              let petBreedsList;
              if (!isAllPetBreedsLoading && allPetBreedsData && allPetBreedsData.length) {
                const sanitizePetBreedsList = [
                  ...allPetBreedsData.map((item: PetBreed) => ({
                    petTypeId: item.petType._id,
                    label: item.name,
                    value: item._id
                  }))
                ];
                petBreedsList = sanitizePetBreedsList.filter((item) => item.petTypeId === watchSelectedPetType);
              }
              return (
                <Select
                  options={petBreedsList || []}
                  selectedValue={value}
                  placeholder='Select gender'
                  onSelect={(value) => {
                    console.log('value', value);
                    return (
                      onChange(value)
                    );
                  }}
                />
              );
            }}
            name='selectedPetBreed'
          />
          {errors.selectedPetBreed && <FormError errMsg={errors.selectedPetBreed.message} />}
        </Column>

        <Column>
          <Typography variant={TypographyVariant.Body} size={Size.Small}>Description:</Typography>
          <Input
            value={formState.description}
            onChangeText={(value) => handleChange('description', value)}
            placeholder='Enter description'
            multiline={true}
            numberOfLines={4}
            shape={Shape.Pill}
          />
        </Column>

        <Column>
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

        <Column>
          <Typography variant={TypographyVariant.Body} size={Size.Small}>Chip number:</Typography>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                inputMode={InputMode.Numeric}
                keyboardType={Keyboard.Numeric}
                value={value || ''}
                placeholder={'Enter your pet chip number'}
                onChangeText={(value) => onChange(value)}
                shape={Shape.Pill}
              />
            )}
            name='chipNumber'
          />
        </Column>

        <Column>
          <Typography variant={TypographyVariant.Body} size={Size.Small}>My pet is:</Typography>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <RadioButton
                options={nuteredOptionList}
                selectedValue={value}
                onValueChange={(value) => onChange(value)}
                direction={FlexDirection.Row}
              />
            )}
            name='isSterilised'
          />
          {errors.isSterilised && <FormError errMsg={errors.isSterilised.message} />}
        </Column>

        <Column gap={10}>
          <Button
            onPress={handleSubmit(onSubmit)}
            title={ButtonTitle.Update}
            variant={ButtonVariant.Contained}
            color={ColorVariant.Primary}
            shape={Shape.Pill}
            disabled={!isDirty}
          />

          <Button
            onPress={handleDelete}
            title={ButtonTitle.Delete}
            variant={ButtonVariant.Contained}
            color={ColorVariant.Error}
            shape={Shape.Pill}
            isLoading={isLoading}
          />
        </Column>
      </Column>
    </ScrollView>
  );
};

export default EditPet;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20
  },
  image: {
    width: 200,
    height: 800,
  },
});
