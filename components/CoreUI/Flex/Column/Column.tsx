import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { FlexAlignItemsType, FlexJustifyContentType, FlexWrapType } from '@/utils/types';
import {
  FlexAlignItems, FlexDirection, FlexJustifyContent, FlexWrap 
} from '@/utils/enum';

interface ColumnProps {
  children: React.ReactNode;
  justifyContent?: FlexJustifyContentType;
  alignItems?: FlexAlignItemsType;
  flexWrap?: FlexWrapType;
  style?: StyleProp<ViewStyle>;
  gap?: number;
  flex?: number;
  bgColor?: string;
}

export const Column: React.FC<ColumnProps> = ({
  children,
  justifyContent = FlexJustifyContent.Start,
  alignItems = FlexAlignItems.Stretch,
  flexWrap = FlexWrap.Nowrap,
  gap = 5,
  flex,
  bgColor,
  style,
}) => {
  return (
    <View
      style={[
        {
          flexDirection: FlexDirection.Column,
          justifyContent,
          alignItems,
          flexWrap,
          gap,
          flex,
          backgroundColor: bgColor
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};