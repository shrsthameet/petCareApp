import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { IconButton } from '../CoreUI/IconButton';
import { IconLibraryName, Shape, Size } from '@/utils/enum';
import { RootState } from '@/redux/rootReducer';
import { ShapeType, SizeType } from '@/utils/types';

interface IBackButtonProps {
  onClick: () => void;
  iconSize?: number;
  bgColor?: string;
  shape?: ShapeType;
  size?: SizeType;
}

export const BackButton: FC<IBackButtonProps> = ({
  onClick,
  iconSize = 24,
  bgColor,
  shape = Shape.Pill,
  size = Size.Small
}) => {
  const { theme } = useSelector((state: RootState) => state.theme);
  return (
    <>
      <IconButton
        iconLibrary={IconLibraryName.Ionicons}
        iconName='chevron-back'
        iconColor={theme.colors.onPrimaryContainer}
        iconSize={iconSize}
        onPress={onClick}
        size={Size.XSmall}
        bgColor={theme.colors.onPrimary}
        shape={Shape.Pill}
      />
    </>
  );
};
