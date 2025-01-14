import React from 'react';
import { SafeAreaView } from 'react-native';
import { PetTypeBreed } from '@/screens/petProfileSetUp';

const PetTypeAndBreed = () => {
  return (
    <SafeAreaView style={{
      flex: 1 
    }}>
      <PetTypeBreed />
    </SafeAreaView>
  );
};

export default PetTypeAndBreed;