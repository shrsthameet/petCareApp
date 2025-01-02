import React from 'react';
import { Column, Row } from '@/components/CoreUI/Flex';
import { Typography } from '@/components/CoreUI/Typography';
import { Button } from '@/components/CoreUI/Button';
import {
  BorderRadius, ButtonVariant, ColorVariant, FlexWrap, Position, 
  Size
} from '@/utils/enum';
import { Dropdown } from '@/components/CoreUI/Dropdown';

const ComponentsUI = () => {
  // Sample data for the dropdown options
  const options = [
    {
      label: 'Option 1', value: '1' 
    },
    {
      label: 'Option 2', value: '2' 
    },
    {
      label: 'Option 3', value: '3' 
    },
  ];

  // Handle selection callback
  const handleSelect = (values: string | string[]) => {
    console.log('Selected values:', values);
  };

  return (
    <Column>
      <Typography>
        Header
      </Typography>
      <Row flexWrap={FlexWrap.Wrap}>
        <Column>
          <Button title='Button' variant={ButtonVariant.Contained} color={ColorVariant.Primary} shape={BorderRadius.Flat} size={Size.Large} />
        </Column>
        <Column>
          <Button title='Button' showIcon={true} iconPosition={Position.Left} variant={ButtonVariant.Contained} color={ColorVariant.Primary} shape={BorderRadius.Curve} size={Size.Medium} />
        </Column>
        <Column>
          <Button title='Button' variant={ButtonVariant.Contained} color={ColorVariant.Primary} shape={BorderRadius.Arch} />
        </Column>
        <Column>
          <Button title='Button' showIcon={true} iconPosition={Position.Left} variant={ButtonVariant.Contained} color={ColorVariant.Primary} shape={BorderRadius.Pill} size={Size.Medium} />
        </Column>
        <Column>
          <Button title='Button' showIcon={true} iconPosition={Position.Left} variant={ButtonVariant.Contained} color={ColorVariant.Primary} shape={BorderRadius.Pill} size={Size.Small} />
        </Column>
      </Row>
      <Column>
        <Dropdown
          options={options}
          placeholder='Select'
          onSelect={handleSelect}
          // style={styles.dropdown}
          shape={BorderRadius.Arch}
        />
      </Column>
    </Column>
  );
};

export default ComponentsUI;
