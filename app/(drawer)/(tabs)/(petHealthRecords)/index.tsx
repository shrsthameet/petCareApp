import React from 'react';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { RootState } from '@/redux/rootReducer';
import { useGetAllPetHealthRecordQuery } from '@/redux/petHealthRecordSlice/petHealthRecordsApi';
import { useGetUserPetProfilesQuery } from '@/redux/uersPetProfileSlice/userPetProfileApi';
import { PetHealthRecordCard } from '@/screens/petHealthRecords/view';
import { Typography } from '@/components/CoreUI/Typography';


const PetHealthRecords = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const { theme } = useSelector((state: RootState) => state.theme);

  const { isLoading: isUserAllPetProfileDataLoading, data: userAllPetProfileData } = useGetUserPetProfilesQuery(user._id);
  const { isLoading: isAllPetHealthRecordsDataLoading, data: allPetHealthRecordsData } = useGetAllPetHealthRecordQuery(userAllPetProfileData && userAllPetProfileData.length ? userAllPetProfileData[0]?._id : '');

  console.log('isUserAllPetProfileDataLoading', isUserAllPetProfileDataLoading);
  console.log('userAllPetProfileData', userAllPetProfileData);
  console.log('isAllPetHealthRecordsDataLoading', isAllPetHealthRecordsDataLoading);
  console.log('allPetHealthRecordsData', allPetHealthRecordsData);



  return (
    <ScrollView>
      {isAllPetHealthRecordsDataLoading ? <Typography>Loading...</Typography> : (
        <PetHealthRecordCard
          theme={theme}
          healthRecords={allPetHealthRecordsData}
        />
      )}
    </ScrollView>
  );
};

export default PetHealthRecords;