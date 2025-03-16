import React, { useState, ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { Typography } from '../Typography';
import { Column, Row } from '../Flex';
import { getTabsStyles } from './Tabs.style';
import {
  FlexJustifyContent, Fonts, Size, TypographyVariant 
} from '@/utils/enum';
import { RootState } from '@/redux/rootReducer';
import { SizeType, TypographyFontType, TypographyVariantsType } from '@/utils/types';

interface Tab {
  title: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  titleSize?: SizeType;
  titleVariant?: TypographyVariantsType;
  titleFontStyle?: TypographyFontType;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  titleSize = Size.Small,
  titleVariant = TypographyVariant.Body,
  titleFontStyle = Fonts.Montserrat_Medium
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const { theme } = useSelector((state: RootState) => state.theme);

  const styles = getTabsStyles(theme);

  return (
    <Column style={styles.container}>
      {/* Tab Headers */}
      <Row justifyContent={FlexJustifyContent.Around} style={styles.tabHeaders}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tabButton, activeTab === index && styles.activeTabButton]}
            onPress={() => setActiveTab(index)}
          >
            <Typography
              variant={titleVariant}
              size={titleSize}
              style={[styles.tabText, ...(activeTab === index ? [styles.activeTabText] : [])]}
              fontFamilyStyle={titleFontStyle}
            >
              {tab.title}
            </Typography>
          </TouchableOpacity>
        ))}
      </Row>

      {/* Tab Content */}
      <Column style={styles.tabContent}>
        {tabs[activeTab].content}
      </Column>
    </Column>
  );
};