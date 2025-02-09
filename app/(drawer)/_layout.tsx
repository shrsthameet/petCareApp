import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useSelector } from 'react-redux';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Alert, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Icon } from '@/components/CoreUI/Icons';
import {
  ButtonTitle,
  ButtonVariant,
  FlexAlignItems, Fonts, IconLibraryName, Position, Size, TypographyVariant 
} from '@/utils/enum';
import { RootState } from '@/redux/rootReducer';
import { Column, Row } from '@/components/CoreUI/Flex';
import { Typography } from '@/components/CoreUI/Typography';
import { ErrorResponse, ITheme } from '@/utils/types';
import { AppDispatch } from '@/redux/store';
import { useLogoutMutation } from '@/redux/authSlice/authApi';
import mmkvStorage from '@/utils/mmkvStorage';
import { clearCredentials } from '@/redux/authSlice';
import { isFetchBaseQueryError } from '@/utils/types/appUtils';
import { Button } from '@/components/CoreUI/Button';
import { Avatar } from '@/components/CoreUI/Avatar';

function CustomDrawerContent(props: any) {
  const { theme } = useSelector((state: RootState) => state.theme);
  const { user } = useSelector((state: RootState) => state.auth);
  const { top, bottom } = useSafeAreaInsets();

  const dispatch = useDispatch<AppDispatch>();
  const [logout] = useLogoutMutation({
  });

  const handleLogout = async () => {
    try {
      const result = await logout('').unwrap();
      if (result.success) {
        mmkvStorage.removeItem('persist:root');
        dispatch(clearCredentials());
      }
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const data = error.data as ErrorResponse;
        Alert.alert('Error', data.error || data.message || 'Something went wrong');
      } else {
        Alert.alert('Error', 'An unexpected error occurred');
      }
    }
  };

  const styles = getDrawerStyles(theme, top, bottom);
  return (
    <Column flex={1}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
      >
        <Row gap={10} alignItems={FlexAlignItems.Center} style={styles.userInfoContainer}>
          <Avatar
            backgroundColor={theme.colors.primary}
            placeholder={`${user.firstName} ${user.lastName}`}
          />
          <Column>
            <Typography
              variant={TypographyVariant.Body}
              size={Size.Small}
              color={theme.colors.onText}
              fontFamilyStyle={Fonts.Montserrat_SemiBold}
            >
              {user.firstName} {user.lastName}
            </Typography>
            <Typography
              variant={TypographyVariant.Caption}
              size={Size.Medium}
              color={theme.colors.onText}
            >
              {user.email}
            </Typography>
          </Column>
        </Row>
        <View style={{
          backgroundColor: '#FFF' 
        }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <Column style={styles.footerContainer}>
        <Button
          showIcon
          iconPosition={Position.Left}
          iconName='logout'
          iconSize={22}
          iconLibrary={IconLibraryName.SimpleLineIcons}
          title={ButtonTitle.Logout}
          variant={ButtonVariant.Text}
          onPress={handleLogout}
        />
      </Column>
    </Column>
  );
}

export default function DrawerLayout() {
  const { theme } = useSelector((state: RootState) => state.theme);
  return (
    <GestureHandlerRootView style={{
      flex: 1
    }}>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          headerShown: false,
          drawerHideStatusBarOnOpen: true,
          drawerActiveTintColor: theme.colors.primary,
          drawerActiveBackgroundColor: theme.colors.secondaryContainer,
          drawerLabelStyle: {
            color: theme.colors.primary,
          },
        }}
      >
        <Drawer.Screen
          name='(tabs)'
          options={{
            drawerLabel: 'Home',
            title: 'Home',
            drawerIcon: () => (
              <Icon name='home' library={IconLibraryName.AntDesign} size={22} color={theme.colors.primary} />
            )
          }}
        />
        <Drawer.Screen
          name='(profile)'
          options={{
            drawerLabel: 'Profile',
            title: 'Profile',
            drawerIcon: () => (
              <Icon name='user-o' library={IconLibraryName.FontAwesome} size={22} color={theme.colors.primary} />
            )
          }}
        />
        <Drawer.Screen
          name='(settings)'
          options={{
            drawerLabel: 'Settings',
            title: 'Settings',
            drawerIcon: () => (
              <Icon name='gear' library={IconLibraryName.Octicons} size={22} color={theme.colors.primary} />
            )
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const getDrawerStyles = (theme: ITheme, top?: number, bottom?: number) => StyleSheet.create({
  userInfoContainer: {
    paddingTop: 10,
    paddingBottom: 30,
  },
  userAvatar: {
    width: 80,
    height: 80,
    borderRadius: 50
  },
  footerContainer: {
    // borderTopColor: theme.colors.surfaceVariant,
    // borderTopWidth: 1,
    padding: 20,
    paddingBottom: bottom
  }
});