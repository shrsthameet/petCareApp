import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Image } from 'expo-image';
import { Typography } from '@/components/CoreUI/Typography';
import { Column, Row } from '@/components/CoreUI/Flex';
import { ITheme } from '@/utils/types';
import { RootState } from '@/redux/rootReducer';
import { globalStyles } from '@/styles/global';
import {
  FlexJustifyContent, IconLibraryName, Size, TypographyVariant 
} from '@/utils/enum';
import { Icon } from '@/components/CoreUI/Icons';
import Img from '@/assets/images/lab.jpg';

const PetHealthRecords = () => {
  const { theme } = useSelector((state: RootState) => state.theme);

  const styles = getPetHealthRecordsStyles(theme);
  return (
    <Column style={globalStyles.horizontalPadding}>
      {/* <Row style={styles.cardContainer}>
        <Row style={styles.cardFloatingTitle}>
          <Icon name='pets' library={IconLibraryName.MaterialIcons} color='rgb(252, 113 87)' size={18} />
          <Typography color='rgb(252, 113 87)' variant={TypographyVariant.Body}  size={Size.Medium}>Title</Typography>
        </Row>
        <Typography>Health Records</Typography>
      </Row> */}

      <Row>
        <Row>
          <Image
            source={Img}
            style={{
              width: 100,
              height: 100
            }}
          />
        </Row>
        <Row>
          <Typography>Title</Typography>
        </Row>
      </Row>
    </Column>
  );
};

export default PetHealthRecords;

const getPetHealthRecordsStyles = (theme: ITheme) => StyleSheet.create({
  cardContainer: {
    position: 'relative',
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 50,
    height: 150
  },
  cardFloatingTitle: {
    position: 'absolute',
    backgroundColor: 'rgb(254, 231, 228)',
    color: 'rgb(252, 113 87)',
    padding: 10,
    width: 200,
    borderRadius: 50,
    top: -25,
    borderColor: 'rgb(250, 247, 254)',
    borderWidth: 8,
    left: 10
  }
});