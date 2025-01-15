import { Stack } from 'expo-router';
import { useSelector } from 'react-redux';
import { FC } from 'react';
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

const PetBioLayout: FC = () => {
  const { theme } = useSelector((state: RootState) => state.theme);

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: theme.colors.background
        },
        headerTransparent: true,
        title: '',
        headerLeft: () => (
          <Row alignItems={FlexAlignItems.Center}>
            <Icon name='chevron-back' library={IconLibraryName.Ionicons} size={20} />
            <Typography variant={TypographyVariant.Body} size={Size.Medium} fontFamilyStyle={Fonts.Montserrat_Medium}>
              {ButtonTitle.Previous}
            </Typography>
          </Row>
        ),
        headerRight: () => (
          <Row alignItems={FlexAlignItems.Center}>
            <Typography variant={TypographyVariant.Body} size={Size.Medium} fontFamilyStyle={Fonts.Montserrat_Medium}>
              {ButtonTitle.Next}
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

export default PetBioLayout;