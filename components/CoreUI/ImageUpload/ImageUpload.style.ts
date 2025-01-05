import { StyleSheet } from 'react-native';
import { FlexAlignItems } from '@/utils/enum';
import { ITheme } from '@/utils/types';

export const getImageUploadStyles = (theme: ITheme) => StyleSheet.create({
  imgContainer: {
    alignItems: FlexAlignItems.Center,
    gap: 10
  },
  image: {
    width: 100, // Set width for the avatar
    height: 100, // Set height for the avatar
    borderRadius: 50, // Make the image circular
    marginTop: 10,
    borderColor: theme.colors.outline,
    borderWidth: 1
  },
});