import { StyleSheet } from 'react-native';
import { ITheme, ShapeType, SizeType } from '@/utils/types';
import {
  FlexAlignItems, FlexDirection, FlexJustifyContent, Shape 
} from '@/utils/enum';
import { getFontSize, getSize } from '@/utils/types/appUtils';

export const getSelectStyles = (theme: ITheme, size?: SizeType, shape?: ShapeType) => StyleSheet.create({
  container: {
    position: 'relative',
  },
  selectButton: {
    flexDirection: FlexDirection.Row,
    alignItems: FlexAlignItems.Center,
    justifyContent: FlexJustifyContent.Between,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: shape ? theme.borderRadius[shape] : theme.borderRadius[Shape.Flat],
    paddingHorizontal: getSize(theme, size),
    paddingVertical: getSize(theme, size),
    backgroundColor: '#fff',
  },
  selectedText: {
    fontSize: getFontSize(theme, size),
    color: '#000',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: (shape === Shape.Arch || shape === Shape.Curve || shape === Shape.Pill || shape === Shape.Circle) ? theme.borderRadius[Shape.Arch] : theme.borderRadius[Shape.Flat],
    zIndex: 1000,
    marginTop: 5,
    overflow: 'hidden',
  },
  option: {
    padding: getSize(theme, size),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionPressed: {
    backgroundColor: '#f0f0f0',
  },
  selectedOption: {
    backgroundColor: theme.colors.primaryContainer
  },
  optionText: {
    // fontSize: 16,
    color: '#000',
  },
});