import { StyleSheet } from 'react-native';
import { ITheme, SizeType } from '@/utils/types';
import { getSize } from '@/utils/types/appUtils';
import {
  FlexAlignItems,
  FlexDirection,
  FlexJustifyContent,
  FlexWrap
} from '@/utils/enum';

export const getRadioButtonStyles = (theme: ITheme, size: SizeType) => StyleSheet.create({
  container: {
    flexDirection: FlexDirection.Column,
  },
  rowDirection: {
    flexDirection: FlexDirection.Row,
    flexWrap: FlexWrap.Wrap, // Wrap buttons if there are too many
    alignItems: FlexAlignItems.Center,
  },
  radioButtonContainer: {
    flexDirection: FlexDirection.Row,
    alignItems: FlexAlignItems.Center,
    marginVertical: 8,
  },
  radioButtonRow: {
    marginHorizontal: 8, // Add spacing between items in row mode
  },
  radioCircle: {
    height: getSize(theme, size) * 2,
    width: getSize(theme, size) * 2,
    borderRadius: theme.borderRadius.circle,
    borderWidth: 1,
    borderColor: theme.colors.primary, // Border color for unselected state
    justifyContent: FlexJustifyContent.Center,
    alignItems: FlexAlignItems.Center,
  },
  radioCircleSelected: {
    borderColor: theme.colors.primary, // Border color for selected state
    backgroundColor: theme.colors.background, // Background remains white
  },
  radioCircleInner: {
    height: getSize(theme, size), // Inner circle size
    width: getSize(theme, size),
    borderRadius: theme.borderRadius.circle,
    backgroundColor: theme.colors.primary, // Blue fill for the inner circle
  },
  radioCircleDisabled: {
    borderColor: theme.colors.onSurfaceDisabled, // Disabled state border
    backgroundColor: '#F0F0F0', // Disabled state background
  },
  radioLabel: {
    marginLeft: 5,
    color: theme.colors.onText,
  },
  radioLabelDisabled: {
    color: theme.colors.onSurfaceDisabled, // Disabled text color
  },
});