import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PetTypeBreed } from '@/screens/petProfileSetUp';
import { globalStyles } from '@/styles/global';

const PetTypeAndBreed = () => {
  return (
    <SafeAreaView style={globalStyles.container}>
      <PetTypeBreed />
    </SafeAreaView>
  );
};

export default PetTypeAndBreed;