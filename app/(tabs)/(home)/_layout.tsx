import { Stack } from 'expo-router';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Row } from '@/components/CoreUI/Flex';
import { FlexAlignItems, FlexJustifyContent, IconLibraryName } from '@/utils/enum';
import { Icon } from '@/components/CoreUI/Icons';

export default function DashboardLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: '#fff'
        },
        headerShadowVisible: false,
        title: '',
        headerLeft: () => (
          <Row>
            <Icon name='bars-staggered' library={IconLibraryName.FontAwesome6} size={28} color={Colors.pitchBlack} />
          </Row>
        ),
        headerRight: () => (
          <Row 
            justifyContent={FlexJustifyContent.Between}
            alignItems={FlexAlignItems.Center}
            gap={20}
            style={{
              paddingLeft: 5,
              paddingRight: 5
            }}>
            <Icon name='notifications-outline' library={IconLibraryName.Ionicons} size={28} color={Colors.pitchBlack} />
            <Icon name='person-circle-outline' library={IconLibraryName.Ionicons} size={35} color={Colors.pitchBlack} />
          </Row>
        ),
      }}
    >
      <Stack.Screen name='index' />
    </Stack>
  );
}