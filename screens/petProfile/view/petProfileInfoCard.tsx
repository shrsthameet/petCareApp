import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { getPetProfileStyles } from './petProfile.style';
import { Row, Column } from '@/components/CoreUI/Flex';
import { Typography } from '@/components/CoreUI/Typography';
import {
  FlexJustifyContent, TypographyVariant, Size, Fonts 
} from '@/utils/enum';
import { RootState } from '@/redux/rootReducer';
import { formatAge } from '@/utils/types/appUtils';

interface IPetProfileInfoCardProps {
  petAge: string;
  petBreed: string;
  isSterilised: boolean;
  petWeight: string;
}

export const PetProfileInfoCard: FC<IPetProfileInfoCardProps> = ({
  petAge,
  petBreed,
  isSterilised,
  petWeight,
}) => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const styles = getPetProfileStyles(theme);

  return (
    <Row justifyContent={FlexJustifyContent.Between}>
      <Column style={[styles.infoCard, {
        backgroundColor: 'rgb(232, 242, 255)'
      }]}>
        <Typography variant={TypographyVariant.Caption} size={Size.Large} color={theme.colors.onText} fontFamilyStyle={Fonts.Montserrat_Medium}>
          Age
        </Typography>
        <Typography variant={TypographyVariant.Caption} size={Size.Medium} color={theme.colors.onText}>
          {formatAge(petAge, true)}
        </Typography>
      </Column>
      <Column style={[styles.infoCard, {
        backgroundColor: 'rgb(239, 249, 232)'
      }]}>
        <Typography variant={TypographyVariant.Caption} size={Size.Large} color={theme.colors.onText} fontFamilyStyle={Fonts.Montserrat_Medium}>
          Breed
        </Typography>
        <Typography variant={TypographyVariant.Caption} size={Size.Medium} color={theme.colors.onText}>
          {petBreed}
        </Typography>
      </Column>
      <Column style={[styles.infoCard, {
        backgroundColor: 'rgb(255, 238, 219)'
      }]}>
        <Typography variant={TypographyVariant.Caption} size={Size.Large} color={theme.colors.onText} fontFamilyStyle={Fonts.Montserrat_Medium}>
          Sterilised
        </Typography>
        <Typography variant={TypographyVariant.Caption} size={Size.Medium} color={theme.colors.onText}>
          {isSterilised ? 'Yes' : 'No'}
        </Typography>
      </Column>
      <Column style={[styles.infoCard, {
        backgroundColor: 'rgb(229, 251, 255)'
      }]}>
        <Typography variant={TypographyVariant.Caption} size={Size.Large} color={theme.colors.onText} fontFamilyStyle={Fonts.Montserrat_Medium}>
          Weight
        </Typography>
        <Typography variant={TypographyVariant.Caption} size={Size.Medium} color={theme.colors.onText}>
          {petWeight}
        </Typography>
      </Column>
    </Row>
  );
};
