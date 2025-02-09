import React, { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { RootState } from '@/redux/rootReducer';
import { ROUTES } from '@/utils/types/routesType';
import { AuthRoutes } from '@/utils/enum';
import { useGetUserPetProfilesQuery } from '@/redux/uersPetProfileSlice/userPetProfileApi';

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const {
    isLoading: isUserPetProfilesLoading,
    data: userPetProfilesData,
    // isError: isUserPetProfilesError,
    // error: userPetProfilesError
  } = useGetUserPetProfilesQuery(user._id);

  const router = useRouter();
  const segments = useSegments();  // Get the current path segments
  // console.log('isUserPetProfilesLoading', isUserPetProfilesLoading);
  // console.log('userPetProfilesData', userPetProfilesData);

  useEffect(() => {
    const currentPath = `/${segments.join('/')}`;  // Construct the current path from segments
    // console.log('currentPath', currentPath);

    if (!isUserPetProfilesLoading && !isAuthenticated) {
      if (currentPath === ROUTES.AUTH.LOGIN || currentPath === ROUTES.AUTH.REGISTER) {
        // Allow the user to stay on login/register pages if not authenticated
        return;
      }
      // Redirect to login if the user is not authenticated and trying to access a protected route
      router.replace(ROUTES.AUTH.LOGIN);
    }
    // else {
    //   console.log('here');
    //   // Redirect authenticated users to the main app (tabs)
    //   if ([ROUTES.AUTH.LOGIN, ROUTES.AUTH.REGISTER].includes(currentPath as AuthRoutes)) {
    //     router.replace(ROUTES.TABS_ROUTES.HOME);
    //   }
    // }
    // if (!isUserPetProfilesLoading && isAuthenticated && (userPetProfilesData && userPetProfilesData.length && !userPetProfilesData[0].isProfileComplete)) {
    //   switch (userPetProfilesData[0].step) {
    //   case 1:
    //     router.replace(ROUTES.PET_PROFILE_SETUP.PET_TYPE_AND_BREED);
    //     break;
    //   case 2:
    //     router.replace(ROUTES.PET_PROFILE_SETUP.PET_BIO);
    //     break;
    //   case 3:
    //     router.replace(ROUTES.PET_PROFILE_SETUP.PET_INFO);
    //     break;
    //   default:
    //     router.replace(ROUTES.PET_PROFILE_SETUP.DEFAULT);
    //     break;
    //   }
    // }
    if (!isUserPetProfilesLoading && isAuthenticated && (userPetProfilesData && userPetProfilesData.length && userPetProfilesData[0].isProfileComplete)) {
      // router.replace(ROUTES.TABS_ROUTES.HOME);
      return;
    }
  }, [isAuthenticated, segments, router, isUserPetProfilesLoading, userPetProfilesData]);

  if (isUserPetProfilesLoading) {
    return (
      <View style={{
        flex: 1, justifyContent: 'center', alignItems: 'center' 
      }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return <React.Fragment>{children}</React.Fragment>;  // Render all stack screens (login, dashboard, etc.)
}