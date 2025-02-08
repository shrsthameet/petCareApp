import React from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Link } from 'expo-router';
import { getMyPetStyles } from './myPetsComponent.style';
import {
  ColorVariant,
  FlexAlignItems, FlexJustifyContent, Fonts, Size, TypographyVariant 
} from '@/utils/enum';
import { Typography } from '@/components/CoreUI/Typography';
import { Column, Row } from '@/components/CoreUI/Flex';
import { RootState } from '@/redux/rootReducer';
import { PetCard } from '@/components/petCard';
import { IconButton } from '@/components/CoreUI/IconButton';
import { useGetUserPetProfilesQuery } from '@/redux/uersPetProfileSlice/userPetProfileApi';
import { IMAGE_BASE_URL } from '@/utils/types/routesType';
import { formatAge } from '@/utils/types/appUtils';
import { CardSkeleton } from '@/components/skeletons/cardSkeleton';

export const MyPetsComponent = () => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const { user } = useSelector((state: RootState) => state.auth);

  const { isLoading: isUserPetProfilesLoading, data: userPetProfilesData } = useGetUserPetProfilesQuery(user._id);
  const styles = getMyPetStyles(theme);

  return (
    <Column gap={10} style={styles.petsContainer}>
      <Row justifyContent={FlexJustifyContent.Between} alignItems={FlexAlignItems.Center}>
        <Typography variant={TypographyVariant.Title} size={Size.Medium} color={theme.colors.onText} fontFamilyStyle={Fonts.Montserrat_SemiBold}>
          My Pets
        </Typography>
        <Link href='/'>
          <IconButton iconName='plus' iconColor={ColorVariant.Primary} size={Size.Small} />
        </Link>
      </Row>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Row gap={30} style={styles.petsContent}>

          {isUserPetProfilesLoading ? <CardSkeleton count={3} /> : (
            <>
              {userPetProfilesData && userPetProfilesData.length ? (
                <>
                  {userPetProfilesData.map((item, index) => (
                    <Link href={`/(petProfile)/view/1`} key={index}>
                      <PetCard
                        imgSrc={`${IMAGE_BASE_URL}${item.image}`}
                        petName={item.name}
                        petAge={formatAge(item.dateOfBirth)}
                        gender={item.gender}
                      />
                    </Link>
                  ))}
                </>
              ) : <Typography>No pets</Typography>}
            </>
          )}

        </Row>
      </ScrollView>
    </Column>
  );
};