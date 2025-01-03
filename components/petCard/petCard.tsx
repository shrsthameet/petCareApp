import { FC } from 'react';
import { Image, ImageSourcePropType } from 'react-native';
import { useSelector } from 'react-redux';
import { Typography } from '../CoreUI/Typography';
import { Icon } from '../CoreUI/Icons/Icons';
import { Column, Row } from '../CoreUI/Flex';
import { getPetCardStyles } from './petCard.style';
import {
  FlexAlignItems,
  FlexJustifyContent,
  IconLibraryName, Size, TypographyVariant 
} from '@/utils/enum';
import { RootState } from '@/redux/rootReducer';

interface IPetCard {
  imgSrc?: ImageSourcePropType | undefined;
  petName?: string;
  petAge?: string;
}

export const PetCard: FC<IPetCard> = ({
  imgSrc,
  petName,
  petAge,
}) => {
  const { theme } = useSelector((state: RootState) => state.theme);

  const styles = getPetCardStyles(theme);
  return (
    <Column style={styles.boxShadow}>

      <Column>
        <Image
          source={imgSrc}
          style={{
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            width: 'auto', 
            height: 120,
            resizeMode: 'cover'
          }} 
        />
      </Column>

      <Column gap={15} style={{
        paddingVertical: 15,
        paddingHorizontal: 15
      }}>
        <Row justifyContent={FlexJustifyContent.Between} alignItems={FlexAlignItems.Center}>
          <Typography variant={TypographyVariant.Title} size={Size.Large}>
            {petName}
          </Typography>
          <Icon library={IconLibraryName.Ionicons} name='male' size={28} />
        </Row>

        <Row gap={8}>
          <Typography variant={TypographyVariant.Body} size={Size.Small}>
            {petAge}
          </Typography>
        </Row>
      </Column>

    </Column>
  );
};