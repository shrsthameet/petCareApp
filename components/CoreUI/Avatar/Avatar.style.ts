import { StyleSheet } from 'react-native';
import { ITheme, ShapeType, SizeType } from '@/utils/types';
import { getSize } from '@/utils/types/appUtils';
import { Shape } from '@/utils/enum';

export const getAvatarStyles = (theme: ITheme, size?: SizeType, shape?: ShapeType) => StyleSheet.create({
  avatar: {
    overflow: 'hidden',
    width: getSize(theme, size) * 4,
    height: getSize(theme, size) * 4,
    borderRadius: shape ? theme.borderRadius[shape] : theme.borderRadius[Shape.Flat],
  },
  image: {
    width: getSize(theme, size) * 4 - 2 * 2,
    height: getSize(theme, size) * 4 - 2 * 2,
    borderRadius: (getSize(theme, size) - 2 * 2) / 2,
    resizeMode: 'cover',
  },
  placeholderText: {
    fontWeight: 'bold',
    fontSize: getSize(theme, size) * 4 / 3,
  },
});