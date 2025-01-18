import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useNavigation, useRouter } from 'expo-router';
import { globalStyles } from '@/styles/global';
import { RootState } from '@/redux/rootReducer';
import { PetInfoComponent } from '@/screens/petProfileSetUp';
import { FormValueType, RoutesType } from '@/utils/types';
import { Button } from '@/components/CoreUI/Button';
import {
  ButtonTitle, ButtonVariant, IconLibraryName, Position 
} from '@/utils/enum';
import { ROUTES } from '@/utils/types/routesType';

interface IInitialState {
  isNutered: boolean;
  chipNumber: string;
  step: number;
}

const nuteredOptionList = [
  {
    label: 'nutered', value: true
  },
  {
    label: 'not nutered', value: false
  },
];

const PetInfo = () => {
  const { theme } = useSelector((state:RootState) => state.theme);
  const router = useRouter();
  const navigation = useNavigation();

  const [initialState, setInitialState] = useState<IInitialState>({
    isNutered: false,
    chipNumber: '',
    step: 3
  });

  const { isNutered, chipNumber, step } = initialState;

  // Handle change
  const handleChange = (field: string, value: FormValueType) => {
    setInitialState((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleSubmit = (link: RoutesType) => {
    const petInfoData = {
      isNutered,
      chipNumber,
      step
    };
    console.log('petBioData', petInfoData);
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
          onPress={() => handleSubmit(ROUTES.PET_PROFILE_SETUP.PET_PROFILE_COMPLETE)}
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
      <PetInfoComponent 
        theme={theme}
        chipNumber={chipNumber}
        isNutered={isNutered}
        nuteredOptionList={nuteredOptionList}
        handleChange={handleChange}
      />
    </SafeAreaView>
  );
};

export default PetInfo;