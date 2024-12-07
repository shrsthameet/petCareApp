import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

export const dropdownStyles = StyleSheet.create({
  container: {
    // backgroundColor: 'red'
  },
  select: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 8,
    backgroundColor: Colors.white,
  },
  selectedText: {
    fontSize: 15,
    color: Colors.black,
  },
  selectedBackground: {
    backgroundColor: Colors.lightGrey
  },
  option: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  optionText: {
    fontSize: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: Colors.pitchBlack,
    color: Colors.white
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 5,
    maxHeight: 200, // Max height for the dropdown
    shadowColor: Colors.pitchBlack,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rounded: {
    borderRadius: 50, // Make the input fully rounded
  },
});