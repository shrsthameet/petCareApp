import { Platform, StyleSheet } from 'react-native';
import { OSType } from '@/utils/enum';

export const greetingHeaderStyles = StyleSheet.create({
  greetingContainer: {
    paddingTop: 25,
    gap: 15,
    marginTop: Platform.OS === OSType.IOS ? 5 : 0
  },
}); 