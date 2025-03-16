import { Stack, useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { FlexAlignItems, FlexJustifyContent, IconLibraryName } from '@/utils/enum';
import { Icon } from '@/components/CoreUI/Icons';
import { Row } from '@/components/CoreUI/Flex';
import { RootState } from '@/redux/rootReducer';

export default function PetHealthRecordsLayout() {
  const { theme } = useSelector((state: RootState) => state.theme);
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: 'rgb(250, 247, 254)',
        },
        headerStyle: {
          backgroundColor: 'rgb(250, 247, 254)',
        },
        title: 'Health records',
        headerShadowVisible: false,
        headerRight: () => (
          <Row 
            justifyContent={FlexJustifyContent.Between}
            alignItems={FlexAlignItems.Center}
            gap={20}
            style={{
              paddingLeft: 5,
              paddingRight: 5
            }}>
            <Icon name='filter' library={IconLibraryName.Ionicons} size={22} color={theme.colors.onText} />
          </Row>
        ),
      }}
    >
      <Stack.Screen name='index' />
      <Stack.Screen name='view/[id]' />
    </Stack>
  );
}