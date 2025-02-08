import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Skeleton } from '../CoreUI/Skeleton';
import { Column, Row } from '../CoreUI/Flex';
import { FlexAlignItems, FlexJustifyContent } from '@/utils/enum';
import { RootState } from '@/redux/rootReducer';
import { ITheme } from '@/utils/types';

interface CardSkeletonProps {
  count?: number;
}

export const CardSkeleton: FC<CardSkeletonProps> = ({ count = 1 }) => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const styles = getStyles(theme);

  return (
    <>
      {Array.from({
        length: count 
      }).map((_, index) => (
        <Column key={index} gap={10} style={styles.boxShadow}>
          <Skeleton style={styles.skeletonImgStyle} />
          <Column gap={10} style={{
            padding: 10 
          }}>
            <Row justifyContent={FlexJustifyContent.Between} alignItems={FlexAlignItems.Center}>
              <Skeleton width={120} height={15} />
              <Skeleton width={30} height={15} />
            </Row>

            <Column gap={20}>
              <Skeleton height={15} />
              <Skeleton height={15} />
            </Column>
          </Column>
        </Column>
      ))}
    </>
  );
};

const getStyles = (theme: ITheme) =>
  StyleSheet.create({
    boxShadow: {
      borderRadius: 15,
      backgroundColor: theme.colors.onPrimary,
      height: 240,
      width: 200,
      // For iOS shadow
      shadowColor: '#a5a5a5',
      shadowOffset: {
        width: 2, height: 2 
      },
      shadowOpacity: 0.6,
      shadowRadius: 5,
      // For Android shadow
      elevation: 4,
    },
    skeletonImgStyle: {
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      width: 'auto',
      height: 120,
      resizeMode: 'cover',
    },
  });