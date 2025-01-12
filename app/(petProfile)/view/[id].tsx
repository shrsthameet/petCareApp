import { StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import Animated, {
  interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset 
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import LabImg from '@/assets/images/lab.jpg';
import { Typography } from '@/components/CoreUI/Typography';
import { globalStyles } from '@/styles/global';
import { Icon } from '@/components/CoreUI/Icons/Icons';
import {
  FlexAlignItems, FlexJustifyContent, Fonts, IconLibraryName, Size, TypographyVariant 
} from '@/utils/enum';
import { Tabs } from '@/components/CoreUI/Tabs';
import { Column, Row } from '@/components/CoreUI/Flex';
import { RootState } from '@/redux/rootReducer';
import { ITheme } from '@/utils/types';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

export default function PetId() {
  const { theme } = useSelector((state: RootState) => state.theme);
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
  const scrollOffset = useScrollViewOffset(scrollRef);
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value, 
            [-IMG_HEIGHT, 0, IMG_HEIGHT], 
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          )
        },
        {
          scale: interpolate(
            scrollOffset.value, 
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          )
        }
      ]
    };
  });

  const customStyles = createPetCardStyles(theme);
  return (
    <Animated.ScrollView ref={scrollRef}>
      <Column>
        {/* Image */}
        <Column>
          <Animated.Image 
            source={LabImg}
            style={[customStyles.image, imageAnimatedStyle]}
          />
        </Column>

        {/* Detail */}
        <Column gap={20} style={[globalStyles.horizontalPadding, customStyles.contentWrapper]}>
          <Column gap={10}>
            <Row justifyContent={FlexJustifyContent.Start} alignItems={FlexAlignItems.Center}>
              <Typography variant={TypographyVariant.Headline} size={Size.Small} fontFamilyStyle={Fonts.Montserrat_Bold}>
                Tommy
              </Typography>
              <Icon library={IconLibraryName.Ionicons} name='male' size={25} />
            </Row>
            <Row alignItems={FlexAlignItems.Center}>
              <Icon library={IconLibraryName.MaterialCommunityIcons} name='cake' size={15} />
              <Typography variant={TypographyVariant.Body} size={Size.Small} fontFamilyStyle={Fonts.Montserrat_Medium}>
                02 Nov, 2018
              </Typography>
            </Row>
            <Row alignItems={FlexAlignItems.Center}>
              <Icon library={IconLibraryName.Ionicons} name='location-sharp' size={15} />
              <Typography variant={TypographyVariant.Body} size={Size.Small} fontFamilyStyle={Fonts.Montserrat_Medium}>
                Parramatta, Sydney, 2150
              </Typography>
            </Row>
          </Column>

          <Row justifyContent={FlexJustifyContent.Between}>
            <Column style={[customStyles.infoCard, {
              backgroundColor: 'rgb(232, 242, 255)'
            }]}>
              <Typography variant={TypographyVariant.Body} size={Size.Small} color={theme.colors.onText} fontFamilyStyle={Fonts.Montserrat_Medium}>
                Age
              </Typography>
              <Typography variant={TypographyVariant.Caption} size={Size.Large} color={theme.colors.onText}>
                12 year
              </Typography>
            </Column>
            <Column style={[customStyles.infoCard, {
              backgroundColor: 'rgb(239, 249, 232)'
            }]}>
              <Typography variant={TypographyVariant.Body} size={Size.Small} color={theme.colors.onText} fontFamilyStyle={Fonts.Montserrat_Medium}>
                Breed
              </Typography>
              <Typography variant={TypographyVariant.Caption} size={Size.Large} color={theme.colors.onText}>
                Labrador
              </Typography>
            </Column>
            <Column style={[customStyles.infoCard, {
              backgroundColor: 'rgb(255, 238, 219)'
            }]}>
              <Typography variant={TypographyVariant.Body} size={Size.Small} color={theme.colors.onText} fontFamilyStyle={Fonts.Montserrat_Medium}>
                Nutered
              </Typography>
              <Typography variant={TypographyVariant.Caption} size={Size.Large} color={theme.colors.onText}>
                Yes
              </Typography>
            </Column>
            <Column style={[customStyles.infoCard, {
              backgroundColor: 'rgb(229, 251, 255)'
            }]}>
              <Typography variant={TypographyVariant.Body} size={Size.Small} color={theme.colors.onText} fontFamilyStyle={Fonts.Montserrat_Medium}>
                Weight
              </Typography>
              <Typography variant={TypographyVariant.Caption} size={Size.Large} color={theme.colors.onText}>
                8 Kg
              </Typography>
            </Column>
          </Row>

          <Row>
            <Tabs tabs={tabsData} />
          </Row>

        </Column>
      </Column>
    </Animated.ScrollView>
  );
}

const createPetCardStyles = (theme: ITheme) => StyleSheet.create({
  image: {
    width: width,
    height: IMG_HEIGHT,
  },
  contentWrapper: {
    backgroundColor: theme.colors.onPrimary,
    paddingTop: 5,
    marginBottom: 35
  },
  infoCard: {
    padding: 10,
    borderRadius: 10,
    width: 85
  },
  btn: {
    width: '50%'
  }
});