import { Stack, useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { FC } from 'react';
import { Pressable } from 'react-native';
import { Row } from '@/components/CoreUI/Flex';
import { Icon } from '@/components/CoreUI/Icons';
import {
  ButtonTitle,
  FlexAlignItems,
  Fonts,
  IconLibraryName,
  Size,
  TypographyVariant
} from '@/utils/enum';
import { Typography } from '@/components/CoreUI/Typography';
import { RootState } from '@/redux/rootReducer';
import { ROUTES } from '@/utils/types/routesType';

const PetTypeAndBreedLayout: FC = () => {
  const { theme } = useSelector((state: RootState) => state.theme);

  const router = useRouter();

  const handleRoute = () => {
    router.push(ROUTES.PET_PROFILE_SETUP.PET_BIO);
  };

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: theme.colors.background
        },
        headerTransparent: true,
        title: '',
        headerBackVisible: false,
        headerRight: () => (
          <Pressable onPress={handleRoute}>
            <Row alignItems={FlexAlignItems.Center}>
              <Typography variant={TypographyVariant.Body} size={Size.Medium} fontFamilyStyle={Fonts.Montserrat_Medium}>
                {ButtonTitle.Next}
              </Typography>
              <Icon name='chevron-forward' library={IconLibraryName.Ionicons} size={20} />
            </Row>
          </Pressable>
        ),
      }}
    >
      <Stack.Screen name='index' />
    </Stack>
  );
};

export default PetTypeAndBreedLayout;