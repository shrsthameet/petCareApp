import React from 'react';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native';
import { getServicesComponentStyles } from './servicesComponent.style';
import { Column, Row } from '@/components/CoreUI/Flex';
import { Typography } from '@/components/CoreUI/Typography';
import {
  Fonts, IconLibraryName, Size, TypographyVariant 
} from '@/utils/enum';
import { RootState } from '@/redux/rootReducer';
import { ServiceCard } from '@/components/serviceCard/serviceCard';

export const ServicesComponent = () => {
  const { theme  } = useSelector((state: RootState) => state.theme);

  const styles = getServicesComponentStyles(theme);

  return (
    <>
      <Column style={styles.container} gap={10}>
        <Typography variant={TypographyVariant.Title} size={Size.Medium} fontFamilyStyle={Fonts.Montserrat_SemiBold}>
        Services
        </Typography>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Row gap={30}>
            <ServiceCard 
              iconName='heartbeat'
              iconLibraryName={IconLibraryName.FontAwesome}
              title='Health'
            />
            <ServiceCard 
              iconName='scissors'
              iconLibraryName={IconLibraryName.FontAwesome}
              title='Grooming'
            />
            <ServiceCard 
              iconName='nutrition'
              iconLibraryName={IconLibraryName.MaterialCommunityIcons}
              title='Nutrition'
            />
            <ServiceCard 
              iconName='pets'
              iconLibraryName={IconLibraryName.MaterialIcons}
              title='Sitters'
            />
            <ServiceCard 
              iconName='model-training'
              iconLibraryName={IconLibraryName.MaterialIcons}
              title='Training'
            />
          </Row>
        </ScrollView>
      </Column>
    </>
  );
};
