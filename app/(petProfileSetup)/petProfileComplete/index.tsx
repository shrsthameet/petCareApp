import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Column } from '@/components/CoreUI/Flex';
import { Typography } from '@/components/CoreUI/Typography';
import { RootState } from '@/redux/rootReducer';
import { getPetProfileSetupStyles } from '@/screens/petProfileSetUp/petProfileSetup.style';
import { globalStyles } from '@/styles/global';
import {
  ButtonVariant,
  FlexAlignItems, FlexJustifyContent, IconLibraryName, Position, Shape, Size, TypographyVariant 
} from '@/utils/enum';
import ProfileCompleteDog from '@/assets/images/petProfileSetup/profileCompleteDog.png';
import { Button } from '@/components/CoreUI/Button';
import { ROUTES } from '@/utils/types/routesType';

const PetProfileComplete = () => {
  const { theme } = useSelector((state:RootState) => state.theme);
  const styles = getPetProfileSetupStyles(theme);

  const router = useRouter();

  const handleRouter = () => {
    router.replace(ROUTES.TABS_ROUTES.Home);
  };
  return (
    <SafeAreaView style={globalStyles.container}>
      <Column flex={1} justifyContent={FlexJustifyContent.Between} style={{
        padding: 20 
      }}>
        <Column gap={20} alignItems={FlexAlignItems.Center} style={styles.container}>
          <Typography variant={TypographyVariant.Title} size={Size.Large}>
            Thanks!
          </Typography>
          <Typography variant={TypographyVariant.Body} size={Size.Small}>
            That's all we want from you to get started.
          </Typography>
        </Column>

        <Column alignItems={FlexAlignItems.Center}>
          <Image
            source={ProfileCompleteDog}
            style={styles.profileCompleteImg}
            contentFit='cover'
            transition={1000}
          />
        </Column>

        <Column>
          <Button
            title={'Get Started'}
            // onPress={onSubmit}
            variant={ButtonVariant.Contained}
            shape={Shape.Pill}
            iconName='arrowright'
            iconLibrary={IconLibraryName.AntDesign}
            showIcon
            iconPosition={Position.Right}
            onPress={handleRouter}
          />
        </Column>
      </Column>
    </SafeAreaView>
  );
};

export default PetProfileComplete;