import { StyleSheet } from 'react-native';
import { ITheme } from '@/utils/types';
import { FlexAlignItems, FlexDirection, FlexJustifyContent } from '@/utils/enum';

export const getDropdownStyle = (theme: ITheme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface, // Dynamically use surface color from the theme
  },
  selectContainer: {
    display: 'flex',
    flexDirection: FlexDirection.Row,
    alignItems: FlexAlignItems.Center,
    justifyContent: FlexJustifyContent.Between,
  },
  selectedText: {
    fontSize: 15,
    color: theme.colors.text, // Use text color from theme
  },
  selectedBackground: {
    backgroundColor: theme.colors.secondaryContainer, // Use secondaryContainer color from theme
  },
  option: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 16,
    color: theme.colors.onSurface, // Use onSurface color from theme
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: theme.colors.primary, // Use primary color from theme
    color: theme.colors.onPrimary, // Use onPrimary color from theme
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: theme.colors.backdrop, // Use backdrop color from theme
  },
  dropdown: {
    position: 'absolute',
    top: 0, // Adjust according to your input field's height
    zIndex: 1000,
    width: '100%',
    backgroundColor: theme.colors.white, // Use white color from theme
    borderWidth: 1,
    borderColor: theme.colors.border, // Use border color from theme
    borderRadius: 5,
    maxHeight: 200,
    shadowColor: theme.colors.shadow, // Use shadow color from theme
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rounded: {
    borderRadius: theme.borderRadius.pill, // Use pill border radius from theme
  },
});