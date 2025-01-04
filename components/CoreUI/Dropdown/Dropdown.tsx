import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SectionList,
  Modal,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Row } from '../Flex';
import { Icon } from '../Icons';
import { getDropdownStyles } from './Dropdown.style';
import {
  FlexAlignItems, FlexJustifyContent, IconLibraryName, Shape, 
  Size
} from '@/utils/enum';
import { RootState } from '@/redux/rootReducer';
import { ShapeType, SizeType } from '@/utils/types';

type DropdownItem = {
  label: string;
  value: string;
};

type SectionedDropdownItem = {
  title: string;
  data: DropdownItem[];
};

type DropdownProps = {
  items: DropdownItem[] | SectionedDropdownItem[];
  onSelect: (value: string[] | string) => void;
  placeholder?: string;
  isSectioned?: boolean;
  isMultiSelect?: boolean;
  selectedValues?: string | string[]; // Preselected values
  style?: StyleProp<ViewStyle>; // Custom styles
  shape?: ShapeType;
  size?: SizeType; // Add size prop
};

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  onSelect,
  placeholder = 'Select an item',
  isSectioned = false,
  isMultiSelect = false,
  selectedValues = '',
  style,
  shape = Shape.Flat,
  size = Size.Medium, // Default size
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const { theme } = useSelector((state: RootState) => state.theme);

  const styles = getDropdownStyles(theme, shape, size);

  // Only update the selectedItems state if selectedValues changes
  useEffect(() => {
    if (typeof selectedValues === 'string') {
      setSelectedItems([selectedValues]);
    } else if (Array.isArray(selectedValues)) {
      setSelectedItems(selectedValues);
    }
  }, [selectedValues]);

  const handleSelect = (item: DropdownItem) => {
    let updatedSelection = [...selectedItems];
    if (isMultiSelect) {
      // Toggle the item in the selected items
      if (updatedSelection.includes(item.value)) {
        updatedSelection = updatedSelection.filter((value) => value !== item.value);
      } else {
        updatedSelection.push(item.value);
      }
    } else {
      updatedSelection = [item.value]; // Single selection
      setIsVisible(false);
    }
    setSelectedItems(updatedSelection);
    onSelect(updatedSelection);
  };

  const isSelected = (value: string) => selectedItems.includes(value);

  const renderFlatList = () => (
    <FlatList
      data={items as DropdownItem[]}
      keyExtractor={(item) => item.value}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => handleSelect(item)}
        >
          <Row justifyContent={FlexJustifyContent.Between}>
            <Text style={styles.itemText}>{item.label}</Text>
            {isSelected(item.value) && (
              <Icon
                name='check'
                library={IconLibraryName.Entypo}
                size={16}
                color={theme.colors.primary}
              />
            )}
          </Row>
        </TouchableOpacity>
      )}
    />
  );

  const renderSectionHeader = ({ section }: { section: SectionedDropdownItem }) => (
    <Text style={styles.sectionHeader}>{section.title}</Text>
  );

  const renderSectionList = () => (
    <SectionList
      sections={items as SectionedDropdownItem[]}
      keyExtractor={(item) => item.value}
      renderSectionHeader={renderSectionHeader}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => handleSelect(item)}
        >
          <Row justifyContent={FlexJustifyContent.Between}>
            <Text style={styles.itemText}>{item.label}</Text>
            {isSelected(item.value) && (
              <Icon
                name='check'
                library={IconLibraryName.Entypo}
                size={16}
                color={theme.colors.primary}
              />
            )}
          </Row>
        </TouchableOpacity>
      )}
    />
  );

  const getLabelForValue = (value: string): string | undefined => {
    if (isSectioned) {
      const sections = items as SectionedDropdownItem[];
      for (const section of sections) {
        const option = section.data.find((o) => o.value === value);
        if (option) {
          return option.label;
        }
      }
    } else {
      const flatOptions = items as DropdownItem[];
      const option = flatOptions?.find((o) => o.value === value);
      return option?.label;
    }
    return undefined;
  };

  const selectedLabels: string | string[] | undefined = isMultiSelect
    ? selectedItems
      .map((value) => getLabelForValue(value))
      .filter(Boolean)
      .join(', ')
    : getLabelForValue(selectedItems[0]);

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsVisible(true)}
      >
        <Row alignItems={FlexAlignItems.Center} justifyContent={FlexJustifyContent.Between}>
          <Text style={styles.buttonText}>
            {selectedLabels || placeholder}
          </Text>
          <Icon
            name={isVisible ? 'chevron-up' : 'chevron-down'}
            library={IconLibraryName.FontAwesome5}
            size={15}
            color={theme.colors.outline}
          />
        </Row>
      </TouchableOpacity>
      <Modal
        visible={isVisible}
        transparent
        animationType='slide'
      >
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setIsVisible(false)}
        >
          <View style={styles.dropdownContainer}>
            <Row justifyContent={FlexJustifyContent.End}>
              <TouchableOpacity
                onPress={() => setIsVisible(false)}
              >
                <Icon
                  name={'cross'}
                  library={IconLibraryName.Entypo}
                  size={20}
                  color={theme.colors.outline}
                />
              </TouchableOpacity>
            </Row>
            {isSectioned ? renderSectionList() : renderFlatList()}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
