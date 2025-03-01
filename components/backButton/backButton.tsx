import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { IconButton } from '../CoreUI/IconButton';
import { IconLibraryName } from '@/utils/enum';
import { RootState } from '@/redux/rootReducer';

interface IBackButtonProps {
  onClick: () => void;
  iconSize?: number;
}

export const BackButton: FC<IBackButtonProps> = ({ onClick, iconSize = 24 }) => {
  const { theme } = useSelector((state: RootState) => state.theme);
  return (
    <>
      <IconButton
        iconLibrary={IconLibraryName.Ionicons}
        iconName='chevron-back'
        iconColor={theme.colors.onPrimaryContainer}
        iconSize={iconSize}
        onPress={onClick}
      />
    </>
  );
};
