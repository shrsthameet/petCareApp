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

interface Tab {
  title: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

export const Tabs: React.FC<TabsProps> = ({ tabs }) => {
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
              variant={TypographyVariant.Title}
              size={Size.Large}
              style={[styles.tabText, ...(activeTab === index ? [styles.activeTabText] : [])]}
              fontFamilyStyle={Fonts.Montserrat_Medium}
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
//   container: {
//     flex: 1,
//   },
//   tabHeaders: {
//     // backgroundColor: '#f1f1f1',
//   },
//   tabButton: {
//     width: '50%',
//     paddingVertical: 10,
//     // backgroundColor: 'grey',
//     display: 'flex',
//     alignItems: 'center',
//     textAlign: 'center'
//   },
//   activeTabButton: {
//     borderBottomWidth: 2,
//     borderBottomColor: '#007bff',
//   },
//   tabText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   activeTabText: {
//     color: '#007bff',
//     fontWeight: 'bold',
//   },
//   tabContent: {
//     flex: 1,
//     paddingVertical: 20,
//   },
// });