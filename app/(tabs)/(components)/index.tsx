import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Column, Row } from '@/components/CoreUI/Flex';
import { Typography } from '@/components/CoreUI/Typography';
import { Button } from '@/components/CoreUI/Button';
import {
  Shape, ButtonVariant, ColorVariant, FlexWrap, Position, 
  Size,
  TypographyVariant,
  IconLibraryName
} from '@/utils/enum';
import { Dropdown } from '@/components/CoreUI/Dropdown';
import { Menu } from '@/components/CoreUI/Menu';

const ComponentsUI = () => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

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

  const handleMenuItemPress = (label: string) => {
    console.log(`${label} pressed`);
  };

  const menuItems = [
    {
      label: 'Profile', onPress: () => handleMenuItemPress('Profile') 
    },
    {
      label: 'Settings', onPress: () => handleMenuItemPress('Settings') 
    },
    {
      label: 'Logout', onPress: () => handleMenuItemPress('Logout') 
    }
  ];

  return (
    <ScrollView>
      <Column style={{
        marginBottom: 105
      }}>
        <Typography>
        Header
        </Typography>
        <Row flexWrap={FlexWrap.Wrap}>
          <Column>
            <Button title='Button' variant={ButtonVariant.Contained} color={ColorVariant.Primary} shape={Shape.Flat} size={Size.Large} />
          </Column>
          <Column>
            <Button title='Button' showIcon={true} iconPosition={Position.Left} variant={ButtonVariant.Contained} color={ColorVariant.Primary} shape={Shape.Curve} size={Size.Medium} />
          </Column>
          <Column>
            <Button title='Button' variant={ButtonVariant.Contained} color={ColorVariant.Primary} shape={Shape.Arch} />
          </Column>
          <Column>
            <Button title='Button' showIcon={true} iconPosition={Position.Left} variant={ButtonVariant.Contained} color={ColorVariant.Primary} shape={Shape.Pill} size={Size.Medium} />
          </Column>
          <Column>
            <Button title='Button' showIcon={true} iconPosition={Position.Left} variant={ButtonVariant.Contained} color={ColorVariant.Primary} shape={Shape.Pill} size={Size.Small} />
          </Column>
        </Row>
        <Column>
          <Dropdown
            items={options}
            placeholder='Select'
            onSelect={handleSelect}
            // style={styles.dropdown}
            shape={Shape.Arch}
          />
        </Column>
        <Column>
          <Typography variant={TypographyVariant.Display} size={Size.Large}>
          Display
          </Typography>
          <Typography variant={TypographyVariant.Display} size={Size.Medium}>
          Display
          </Typography>
          <Typography variant={TypographyVariant.Display} size={Size.Small}>
          Display
          </Typography>
        </Column>
        <Column>
          <Typography variant={TypographyVariant.Headline} size={Size.Large}>
          Headline
          </Typography>
          <Typography variant={TypographyVariant.Headline} size={Size.Medium}>
          Headline
          </Typography>
          <Typography variant={TypographyVariant.Headline} size={Size.Small}>
          Headline
          </Typography>
        </Column>
        <Column>
          <Typography variant={TypographyVariant.Title} size={Size.Large}>
          Title
          </Typography>
          <Typography variant={TypographyVariant.Title} size={Size.Medium}>
          Title
          </Typography>
          <Typography variant={TypographyVariant.Title} size={Size.Small}>
          Title
          </Typography>
        </Column>
        <Column>
          <Typography variant={TypographyVariant.Body} size={Size.Large}>
         Body
          </Typography>
          <Typography variant={TypographyVariant.Body} size={Size.Medium}>
         Body
          </Typography>
          <Typography variant={TypographyVariant.Body} size={Size.Small}>
         Body
          </Typography>
        </Column>
        <Column>
          <Typography variant={TypographyVariant.Caption} size={Size.Large}>
            Caption
          </Typography>
          <Typography variant={TypographyVariant.Caption} size={Size.Medium}>
           Caption
          </Typography>
          <Typography variant={TypographyVariant.Caption} size={Size.Small}>
          Caption
          </Typography>
        </Column>
        <Row>
          <Menu
            menuItems={menuItems}
            iconName='dots-three-vertical'
            iconSize={24}
            iconColor='#007BFF'
            iconLibrary={IconLibraryName.Entypo}
            menuVisible={menuVisible}
            toggleMenu={toggleMenu}
            position='right'
          />
        </Row>
      </Column>
    </ScrollView>
  );
};

export default ComponentsUI;
