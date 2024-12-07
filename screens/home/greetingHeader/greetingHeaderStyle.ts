import { Platform, StyleSheet } from 'react-native';
import { OSType } from '@/utils/enum';

export const greetingHeaderStyles = StyleSheet.create({
  greetingContainer: {
    padding: 25,
    gap: 20,
    marginTop: Platform.OS === OSType.IOS ? 5 : 0
  },
}); 