import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Skeleton } from '../CoreUI/Skeleton';
import { Column, Row } from '../CoreUI/Flex';
import { FlexAlignItems, FlexJustifyContent } from '@/utils/enum';
import { RootState } from '@/redux/rootReducer';
import { ITheme } from '@/utils/types';

interface IPetProfileSkeletonProps {
  count?: number;
}

export const PetProfileSkeleton: FC<IPetProfileSkeletonProps> = ({ count = 1 }) => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const styles = getStyles(theme);

  return (
    <>
      {Array.from({
        length: count 
      }).map((_, index) => (
        <Column flex={1} key={index} gap={10} style={styles.container}>
          <Skeleton style={styles.skeletonImgStyle} />
          <Column gap={30} style={{
            padding: 10 
          }}>
            <Column gap={10}>
              <Row justifyContent={FlexJustifyContent.Between} alignItems={FlexAlignItems.Center}>
                <Skeleton width={180} height={20} />
                <Skeleton width={50} height={20} />
              </Row>
              <Row>
                <Skeleton width={30} height={15} />
                <Skeleton width={120} height={15} />
              </Row>
              <Row>
                <Skeleton width={30} height={15} />
                <Skeleton width={220} height={15} />
              </Row>
            </Column>

            <Column>
              <Row justifyContent={FlexJustifyContent.Between}>
                <Skeleton width={85} height={60} />
                <Skeleton width={85} height={60} />
                <Skeleton width={85} height={60} />
                <Skeleton width={85} height={60} />
              </Row>
            </Column>

            <Column>
              <Row justifyContent={FlexJustifyContent.Between}>
                <Skeleton width={180} height={25} />
                <Skeleton width={180} height={25} />
              </Row>
            </Column>

            <Column gap={15}>
              <Skeleton width={160} height={20} />
              <Skeleton height={15} />
              <Skeleton width={120} height={15} />
              <Skeleton height={15} />
              <Skeleton width={160} height={15} />
              <Skeleton width={80} height={15} />
              <Skeleton width={260} height={15} />
            </Column>
          </Column>
        </Column>
      ))}
    </>
  );
};

const getStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
    },
    skeletonImgStyle: {
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      height: 300,
      resizeMode: 'cover',
    },
  });