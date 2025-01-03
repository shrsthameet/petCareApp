import React from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Link } from 'expo-router';
import { getMyPetStyles } from './myPetsComponent.style';
import GingerImg from '@/assets/images/ginger.jpg';
import {
  ColorVariant,
  FlexAlignItems, FlexJustifyContent, Fonts, Size, TypographyVariant 
} from '@/utils/enum';
import { Typography } from '@/components/CoreUI/Typography';
import LabImg from '@/assets/images/lab.jpg';
import { Column, Row } from '@/components/CoreUI/Flex';
import { RootState } from '@/redux/rootReducer';
import { PetCard } from '@/components/petCard';
import { IconButton } from '@/components/CoreUI/IconButton';

export const MyPetsComponent = () => {
  const { theme } = useSelector((state: RootState) => state.theme);

  const styles = getMyPetStyles(theme);

  return (
    <Column gap={10} style={styles.petsContainer}>
      <Row justifyContent={FlexJustifyContent.Between} alignItems={FlexAlignItems.Center}>
        <Typography variant={TypographyVariant.Title} size={Size.Medium} color={theme.colors.text} fontFamilyStyle={Fonts.Montserrat_SemiBold}>
          My Pets
        </Typography>
        <Link href='/'>
          <IconButton iconName='plus' iconColor={ColorVariant.Primary} size={Size.Small} />
        </Link>
      </Row>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Row gap={30} style={styles.petsContent}>

          <Link href='/(petProfile)/view/1'>
            <PetCard
              imgSrc={LabImg}
              petName='Tommy'
              petAge='2 years 8 months'
            />
          </Link>

          <Link href='/(petProfile)/view/2'>
            <PetCard
              imgSrc={GingerImg}
              petName='Bob'
              petAge='4 years 2 months'
            />
          </Link>

        </Row>
      </ScrollView>
    </Column>
  );
};