import React, { FC } from 'react';
import { Column, Row } from '@/components/CoreUI/Flex';
import { Icon } from '@/components/CoreUI/Icons';
import { Typography } from '@/components/CoreUI/Typography';
import {
  FlexJustifyContent,
  FlexAlignItems,
  TypographyVariant,
  Size,
  Fonts,
  IconLibraryName,
  GenderValue
} from '@/utils/enum';
import { formatDateOfBirth } from '@/utils/types/appUtils';
import { GenderValueType } from '@/utils/types';

interface IPetProfileHeader {
  petName: string;
  birthDate: string;
  address: string;
  gender: GenderValueType;
}

export const PetProfileHeader: FC<IPetProfileHeader> = ({
  petName,
  birthDate,
  address,
  gender
}) => {
  return (
    <Column gap={10}>
      <Row justifyContent={FlexJustifyContent.Start} alignItems={FlexAlignItems.Center}>
        <Typography variant={TypographyVariant.Headline} size={Size.Small} fontFamilyStyle={Fonts.Montserrat_Bold}>
          {petName}
        </Typography>
        <Icon library={IconLibraryName.Ionicons} name={gender === GenderValue.Male ? 'male' : 'female'} size={25} />
      </Row>
      <Row alignItems={FlexAlignItems.Center}>
        <Icon library={IconLibraryName.MaterialCommunityIcons} name='cake' size={15} />
        <Typography variant={TypographyVariant.Body} size={Size.Small} fontFamilyStyle={Fonts.Montserrat_Medium}>
          {formatDateOfBirth(birthDate)}
        </Typography>
      </Row>
      <Row alignItems={FlexAlignItems.Center}>
        <Icon library={IconLibraryName.Ionicons} name='location-sharp' size={15} />
        <Typography variant={TypographyVariant.Body} size={Size.Small} fontFamilyStyle={Fonts.Montserrat_Medium}>
          {address}
        </Typography>
      </Row>
    </Column>
  );
};
