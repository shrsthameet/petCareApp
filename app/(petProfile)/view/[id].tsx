import React from 'react';
import Animated, { useAnimatedRef } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { useLocalSearchParams } from 'expo-router';
import { Typography } from '@/components/CoreUI/Typography';
import { globalStyles } from '@/styles/global';
import {
  Fonts,
  Size,
  TypographyVariant
} from '@/utils/enum';
import { Tabs } from '@/components/CoreUI/Tabs';
import { Column, Row } from '@/components/CoreUI/Flex';
import { RootState } from '@/redux/rootReducer';
import {
  getPetProfileStyles,
  PetProfileHeader,
  PetProfileImageView,
  PetProfileInfoCard
} from '@/screens/petProfile/view';
import { useGetPetProfileByIdQuery } from '@/redux/petProfileSlice/petProfileApi';
import { PetProfileSkeleton } from '@/components/skeletons';

export default function PetId() {
  const { id } = useLocalSearchParams();

  const { isLoading: isPetProfileLoading, data: petProfileData } = useGetPetProfileByIdQuery(id);

  console.log('petProfileData', petProfileData);

  const { theme } = useSelector((state: RootState) => state.theme);
  const styles = getPetProfileStyles(theme);
  const tabsData = [
    {
      title: 'Info',
      content: (
        <Column>
          <Column>
            <Typography variant={TypographyVariant.Title} size={Size.Medium} fontFamilyStyle={Fonts.Montserrat_SemiBold}>
              Description
            </Typography>
            <Typography variant={TypographyVariant.Body} size={Size.Small} lineHeight={22}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem 
              Ipsum has been the industry's standard dummy text ever since the 1500s, when an 
              unknown printer took a galley of type and scrambled it to make a type specimen book. It 
              has survived not only five centuries, but also the leap into electronic typesetting, 
              remaining essentially unchanged.
            </Typography>
          </Column>
        </Column>
      ),
    },
    {
      title: 'Health',
      content: (
        <Column gap={20}>
          <Column>
            <Typography variant={TypographyVariant.Title} size={Size.Medium} fontFamilyStyle={Fonts.Montserrat_SemiBold}>
              Medical Conditions
            </Typography>
            <Typography variant={TypographyVariant.Body} size={Size.Medium}>
              None
            </Typography>
          </Column>

          <Column gap={10}>
            <Typography variant={TypographyVariant.Title} size={Size.Medium} fontFamilyStyle={Fonts.Montserrat_SemiBold}>
              Vaccinations
            </Typography>
            <Typography variant={TypographyVariant.Body} size={Size.Medium}>
              Rabies
            </Typography>
          </Column>

          <Column gap={10}>
            <Typography variant={TypographyVariant.Title} size={Size.Medium} fontFamilyStyle={Fonts.Montserrat_SemiBold}>
              Medications
            </Typography>
            <Typography variant={TypographyVariant.Body} size={Size.Medium}>
              Rabies
            </Typography>
          </Column> 
        </Column>
      ),
    },
  ];

  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  return (
    <Animated.ScrollView ref={scrollRef}>
      {isPetProfileLoading ? <PetProfileSkeleton /> : (
        petProfileData && (
          <Column>
            {/* Image */}
            <PetProfileImageView imgSrc={petProfileData.image} scrollRef={scrollRef} />
  
            {/* Detail */}
            <Column gap={20} style={[globalStyles.horizontalPadding, styles.contentWrapper]}>
              <PetProfileHeader
                petName={petProfileData.name}
                birthDate={petProfileData.dateOfBirth}
                address='Parramatta, Sydney, 2018'
                gender={petProfileData.gender}
              />
  
              <PetProfileInfoCard
                petAge={petProfileData.dateOfBirth}
                petBreed={petProfileData.petBreed.name}
                isSterilised={petProfileData.isSterilised}
                petWeight={'8 kg'}
              />
  
              <Row>
                <Tabs tabs={tabsData} />
              </Row>
  
            </Column>
          </Column>
        )
      )}
    </Animated.ScrollView>
  );
}