import { StyleSheet } from 'react-native';
import { ITheme } from '@/utils/types';
import { FlexAlignItems, FlexDirection, FlexJustifyContent } from '@/utils/enum';

export const getCheckboxStyles = (
  theme: ITheme,
  color?: string,
  checked?: boolean
) => StyleSheet.create({
  container: {
    flexDirection: FlexDirection.Row,
    alignItems: FlexAlignItems.Center,
  },
  checkbox: {
    borderWidth: 2,
    borderColor: color ? color : theme.colors.primary,
    backgroundColor: checked ? (color ? color : theme.colors.primary) : theme.colors.elevation.level0,
    justifyContent: FlexJustifyContent.Center,
    alignItems: FlexAlignItems.Center,
    borderRadius: 4,
    marginHorizontal: 8,
  },
});