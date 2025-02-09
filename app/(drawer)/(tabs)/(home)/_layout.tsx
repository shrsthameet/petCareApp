import { Stack, useNavigation } from 'expo-router';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Pressable } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Row } from '@/components/CoreUI/Flex';
import { FlexAlignItems, FlexJustifyContent, IconLibraryName } from '@/utils/enum';
import { Icon } from '@/components/CoreUI/Icons';
import { RootState } from '@/redux/rootReducer';

export default function DashboardLayout() {
  const { theme } = useSelector((state: RootState) => state.theme);
  const navigation = useNavigation();
  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
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
            <Pressable onPress={toggleDrawer}>
              <Icon name='bars-staggered' library={IconLibraryName.FontAwesome6} size={22} color={Colors.pitchBlack} />
            </Pressable>
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
            <Icon name='bell-o' library={IconLibraryName.FontAwesome} size={22} color={theme.colors.onText} />
          </Row>
        ),
      }}
    >
      <Stack.Screen name='index' />
    </Stack>
  );
}