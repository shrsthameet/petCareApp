import { StyleSheet } from 'react-native';
import { ITheme, ShapeType, SizeType } from '@/utils/types';
import { getShapeStyle, getSize } from '@/utils/types/appUtils';

export const getDropdownStyles = (theme: ITheme, shape?: ShapeType, size?: SizeType) => StyleSheet.create({
  container: {
    // margin: 10,
  },
  dropdownButton: {
    padding: getSize(theme, size),
    borderWidth: 1,
    borderColor: theme.colors.surfaceVariant,
    borderRadius: shape && getShapeStyle(theme, shape),
  },
  buttonText: {
    fontSize: 16,
    color: theme.colors.outline,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownContainer: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    maxHeight: '50%',
    gap: 10
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    // color: theme.colors.onSurface,
  },
  sectionHeader: {
    backgroundColor: theme.colors.primaryContainer,
    padding: 10,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});