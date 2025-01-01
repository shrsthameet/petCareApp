import React from 'react';
import { Column, Row } from '@/components/CoreUI/Flex';
import { Typography } from '@/components/CoreUI/Typography';
import { Button } from '@/components/CoreUI/Button';
import { BorderRadius, ButtonVariant, ColorVariant } from '@/utils/enum';

const ComponentsUI = () => {
  return (
    <Column>
      <Typography>
        Header
      </Typography>
      <Row>
        <Button title='Button' variant={ButtonVariant.Contained} color={ColorVariant.Primary} shape={BorderRadius.Flat} />
        <Button title='Button' showIcon={true} iconPosition='left' variant={ButtonVariant.Contained} color={ColorVariant.Primary} shape={BorderRadius.Curve} />
        <Button title='Button' variant={ButtonVariant.Contained} color={ColorVariant.Primary} shape={BorderRadius.Arch} />
        <Button title='Button' variant={ButtonVariant.Contained} color={ColorVariant.Primary} shape={BorderRadius.Pill} />
      </Row>
    </Column>
  );
};

export default ComponentsUI;
