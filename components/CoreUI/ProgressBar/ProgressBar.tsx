import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useSelector } from 'react-redux';
import { Column } from '../Flex';
import { getProgressBarStyle } from './ProgressBar.style';
import { RootState } from '@/redux/rootReducer';

interface ProgressBarProps {
  progress: number; // Progress as a percentage (0 to 100)
  height?: number; // Optional height of the progress bar
  backgroundColor?: string; // Optional background color for the progress bar track
  progressColor?: string; // Optional color for the progress indicator
  duration?: number; // Animation duration in milliseconds
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  backgroundColor = '#e0e0e0',
  progressColor = '#FFC107',
  duration = 500,
}) => {
  const { theme } = useSelector((state: RootState) => state.theme);

  const animatedValue = useRef(new Animated.Value(0)).current;

  const styles = getProgressBarStyle(theme);

  useEffect(() => {
    // Animate the width whenever the `progress` value changes
    Animated.timing(animatedValue, {
      toValue: progress,
      duration,
      useNativeDriver: false, // UseNativeDriver cannot animate width directly
    }).start();
  }, [progress, duration]);

  return (
    <Column style={[styles.container, {
      height,
      backgroundColor
    }]}>
      <Animated.View
        style={[
          styles.progress,
          {
            width: animatedValue.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
            backgroundColor: progressColor,
          },
        ]}
      />
    </Column>
  );
};


