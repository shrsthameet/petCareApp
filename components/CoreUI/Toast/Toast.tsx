import React, { useEffect, useRef } from 'react';
import {
  Animated,
  TouchableOpacity,
  Easing,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Typography } from '../Typography';
import { Icon } from '../Icons';
import { Column } from '../Flex';
import { getToastStyle } from './Toast.style';
import { RootState } from '@/redux/rootReducer';
import { ColorVariantType, PositionType } from '@/utils/types';
import {
  ColorVariant, IconLibraryName, Position, Size, TypographyVariant 
} from '@/utils/enum';
interface ToastProps {
  message: string;
  type?: ColorVariantType | undefined;
  duration?: number | undefined; // Auto-dismiss in milliseconds
  position?: PositionType | undefined;
  onClose?: () => void | undefined;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = ColorVariant.Success,
  duration = 300000,
  position = Position.Top,
  onClose,
}) => {
  const { theme } = useSelector((state: RootState) => state.theme);

  const styles = getToastStyle(theme);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(position === Position.Top ? -50 : 50)).current;

  useEffect(() => {
    requestAnimationFrame(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    });

    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: position === 'top' ? -50 : 50,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onClose) onClose();
    });
  };

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        styles[type],
        position === Position.Top ? styles.topPosition : styles.bottomPosition,
        {
          opacity: fadeAnim,
          transform: [{
            translateY: translateYAnim 
          }],
        },
      ]}
    >
      <Typography
        variant={TypographyVariant.Body}
        size={Size.Small}
        style={styles.toastText}
      >
        {message}
      </Typography>
      <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
        <Column>
          <Icon name='x' library={IconLibraryName.Feather} size={18} color={theme.colors.onText} />
        </Column>
      </TouchableOpacity>
    </Animated.View>
  );
};
