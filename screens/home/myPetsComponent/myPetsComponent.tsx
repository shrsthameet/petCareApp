import React from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Link } from 'expo-router';
import { myPetsStyles } from './myPetsComponent.style';
import GingerImg from '@/assets/images/ginger.jpg';
import {
  FlexAlignItems, FlexJustifyContent, Size, TypographyVariant 
} from '@/utils/enum';
import { Typography } from '@/components/CoreUI/Typography';
import { globalStyles } from '@/styles/global';
import LabImg from '@/assets/images/lab.jpg';
import { Column, Row } from '@/components/CoreUI/Flex';
import { RootState } from '@/redux/rootReducer';
import { PetCard } from '@/components/petCard';

export const MyPetsComponent = () => {
  const { theme } = useSelector((state: RootState) => state.theme);
  return (
    <Column gap={10} style={myPetsStyles.petsContainer}>
      <Row justifyContent={FlexJustifyContent.Between} alignItems={FlexAlignItems.Center} style={globalStyles.horizontalPadding}>
        <Typography variant={TypographyVariant.Title} size={Size.Large} color={theme.colors.text} fontWeight='700'>
          My Pets
        </Typography>
        {/* <Link href='/(petProfile)/addNewPet'> */}
        {/* <IconButton icon='plus' mode={ButtonVariant.Contained} /> */}
        {/* </Link> */}
      </Row>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Row gap={30} style={myPetsStyles.petsContent}>

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