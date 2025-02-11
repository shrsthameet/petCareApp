import { Dimensions, StyleSheet } from 'react-native';
import { ITheme } from '@/utils/types';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

export const getPetProfileStyles = (theme: ITheme) => StyleSheet.create({
  imageContainer: {
    position: 'relative',
    width: width,
    height: IMG_HEIGHT,
    overflow: 'hidden',
  },
  image: {
    width: width,
    height: IMG_HEIGHT,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: IMG_HEIGHT,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark overlay
  },
  contentWrapper: {
    backgroundColor: theme.colors.onPrimary,
    paddingTop: 5,
    marginBottom: 35,
  },
  infoCard: {
    padding: 10,
    borderRadius: 10,
    width: 85,
  },
  btn: {
    width: '50%',
  },
});
