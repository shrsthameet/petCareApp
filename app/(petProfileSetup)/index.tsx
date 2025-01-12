import React from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Typography } from '@/components/CoreUI/Typography';
import {
  ButtonVariant,
  FlexAlignItems,
  FlexJustifyContent,
  Shape,
  Size,
  TypographyVariant
} from '@/utils/enum';
import { Column } from '@/components/CoreUI/Flex';
import SadDog from '@/assets/images/petProfileSetup/sadDog.png';
import { Button } from '@/components/CoreUI/Button';

const PetInfo = () => {
  return (
    <Column gap={20} flex={1} justifyContent={FlexJustifyContent.Center}>
      <Column alignItems={FlexAlignItems.Center}>
        <Typography variant={TypographyVariant.Title} size={Size.Medium}>
          Welcome Favour!
        </Typography>
      </Column>
      <Column alignItems={FlexAlignItems.End}>
        <Image
          source={SadDog}
          style={styles.image}
          contentFit='cover'
          transition={1000}
        />
      </Column>

      <Column gap={40}>
        <Column alignItems={FlexAlignItems.Center}>
          <Typography variant={TypographyVariant.Body} size={Size.Small}>
            Time to add your Pal(s)
          </Typography>
        </Column>
        <Column gap={15} alignItems={FlexAlignItems.Center}>
          <Column style={{
            width: '70%'
          }}>
            <Button title='Add pet' shape={Shape.Pill} />
          </Column>
          <Column style={{
            width: '70%'
          }}>
            <Button title='Skip, add later' shape={Shape.Pill} variant={ButtonVariant.Outlined} />
          </Column>
        </Column>
      </Column>
    </Column>
  );
};

export default PetInfo;

const styles = StyleSheet.create({
  image: {
    width: 350,
    height: 350,
  },
});