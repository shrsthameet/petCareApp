import React, { FC } from 'react';
import { Column, Row } from '@/components/CoreUI/Flex';
import { ProgressBar } from '@/components/CoreUI/ProgressBar';
import { Typography } from '@/components/CoreUI/Typography';
import { FlexJustifyContent, TypographyVariant, Size } from '@/utils/enum';

interface IPetProfileProgressComponent {
  totalStep: number;
  currentStep: number;
  progress: number;
}

export const PetProfileProgressComponent: FC<IPetProfileProgressComponent> = ({
  totalStep,
  currentStep,
  progress
}) => {
  return (
    <Column gap={10}>
      <ProgressBar progress={progress} height={4} />
      <Row justifyContent={FlexJustifyContent.Between}>
        <Typography variant={TypographyVariant.Body} size={Size.Small}>
          Step
        </Typography>
        <Typography variant={TypographyVariant.Body} size={Size.Small}>
          {currentStep} / {totalStep}
        </Typography>
      </Row>
    </Column>
  );
};
