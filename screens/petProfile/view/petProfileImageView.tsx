import React, { FC } from 'react';
import Animated, { interpolate, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { getPetProfileStyles } from './petProfile.style';
import { Column } from '@/components/CoreUI/Flex';
import { RootState } from '@/redux/rootReducer';
import { IMAGE_BASE_URL } from '@/utils/types/routesType';

const IMG_HEIGHT = 300;

interface IPetProfileImageViewProps {
  imgSrc?: any;
  scrollRef?: any;
}

export const PetProfileImageView: FC<IPetProfileImageViewProps> = ({ imgSrc, scrollRef }) => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const styles = getPetProfileStyles(theme);
  const scrollOffset = useScrollViewOffset(scrollRef);

  const imageURL = `${IMAGE_BASE_URL}${imgSrc}`;
  console.log('imageURL', imageURL);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value, 
            [-IMG_HEIGHT, 0, IMG_HEIGHT], 
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          )
        },
        {
          scale: interpolate(
            scrollOffset.value, 
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          )
        }
      ]
    };
  });

  return (
    <Column>
      <Animated.Image
        source={{
          uri: imageURL 
        }}
        style={[styles.image, imageAnimatedStyle]}
      />
    </Column>
  );
};
