import { Stack } from 'expo-router';
import { useSelector } from 'react-redux';
import { Row } from '@/components/CoreUI/Flex';
import { Icon } from '@/components/CoreUI/Icons';
import {
  FlexAlignItems, Fonts, IconLibraryName, Size, TypographyVariant 
} from '@/utils/enum';
import { Typography } from '@/components/CoreUI/Typography';
import { RootState } from '@/redux/rootReducer';

const PetProfileSetupLayout = () => {
  const { theme } = useSelector((state: RootState) => state.theme);

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: theme.colors.background
        },
        // headerShadowVisible: false,
        headerTransparent: true,
        title: '',
        headerRight: () => (
          <Row alignItems={FlexAlignItems.Center}>
            <Typography variant={TypographyVariant.Body} size={Size.Medium} fontFamilyStyle={Fonts.Montserrat_Medium}>
              Next
            </Typography>
            <Icon name='chevron-forward' library={IconLibraryName.Ionicons} size={20} />
          </Row>
        ),
      }}
    >
      <Stack.Screen name='index' />
    </Stack>
  );
};

export default PetProfileSetupLayout;