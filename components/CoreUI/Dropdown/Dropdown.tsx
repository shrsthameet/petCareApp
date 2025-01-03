import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SectionList,
  Modal,
  ViewStyle,
  StyleProp,
  Pressable,
  Platform,
  findNodeHandle,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Icon } from '../Icons/Icons';
import { Typography } from '../Typography';
import { Row } from '../Flex';
import { getDropdownStyle } from './Dropdown.style';
import {
  Shape, IconLibraryName, OSType, Size, TypographyVariant 
} from '@/utils/enum';
import { RootState } from '@/redux/rootReducer';
import { ShapeType } from '@/utils/types';

interface Option {
  label: string;
  value: string;
}

interface Section {
  title: string;
  data: Option[];
}

interface DropdownProps {
  options: Option[] | Section[]; // Flat options or sectioned options
  placeholder?: string; // Placeholder text
  onSelect: (values: string | string[]) => void; // Callback when options are selected
  selectedValues?: string | string[]; // Allow selected values as either a string or an array of strings
  style?: StyleProp<ViewStyle>; // Optional custom styles for the select input
  isSectioned?: boolean; // Flag to indicate sectioned list
  isMultiSelect?: boolean; // Flag to allow multiple selections
  shape?: ShapeType; // Flag to display rounded corner
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = 'Select options',
  onSelect,
  selectedValues = '',
  style,
  isSectioned = false,
  isMultiSelect = false,
  shape = Shape.Flat,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [localSelectedValues, setLocalSelectedValues] = useState<string[]>([]);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const selectRef = useRef<View>(null); // Use View ref instead of TouchableOpacity
  const { theme } = useSelector((state: RootState) => state.theme);

  const customStyles = getDropdownStyle(theme);

  // Initialize local selected values based on selectedValues prop
  React.useEffect(() => {
    if (typeof selectedValues === 'string') {
      setLocalSelectedValues([selectedValues]);
    } else if (Array.isArray(selectedValues)) {
      setLocalSelectedValues(selectedValues);
    }
  }, [selectedValues]);

  const handleOptionPress = (value: string) => {
    if (isMultiSelect) {
      let updatedSelectedValues = [...localSelectedValues];
      if (updatedSelectedValues.includes(value)) {
        updatedSelectedValues = updatedSelectedValues.filter((item) => item !== value);
      } else {
        updatedSelectedValues.push(value);
      }
      setLocalSelectedValues(updatedSelectedValues);
      onSelect(updatedSelectedValues);
    } else {
      setLocalSelectedValues([value]);
      onSelect(value);
      setIsVisible(false); // Close dropdown after selecting an item in single-select mode
    }
  };

  const openDropdown = () => {
    const nodeHandle = findNodeHandle(selectRef.current);
    if (nodeHandle) {
      selectRef.current?.measure((fx, fy, width, height, px, py) => {
        const additionalOffset = Platform.OS === OSType.ANDROID ? -22 : 5; // Adjust for Android
        setDropdownPosition({
          top: py + height + additionalOffset,
          left: px,
          width: width,
        });
      });
    }
    setIsVisible(true);
  };

  const renderOption = ({ item }: { item: Option }) => (
    <TouchableOpacity
      onPress={() => handleOptionPress(item.value)}
      style={[
        customStyles.option,
        localSelectedValues.includes(item.value) && customStyles.selectedBackground,
      ]}
    >
      <Text style={customStyles.optionText}>{item.label}</Text>
      {localSelectedValues.includes(item.value) && (
        <Icon name='check' library={IconLibraryName.FontAwesome5} size={15} />
      )}
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section }: { section: Section }) => (
    <Text style={customStyles.sectionHeader}>{section.title}</Text>
  );

  const renderContent = () => {
    if (isSectioned) {
      return (
        <SectionList
          sections={options as Section[]}
          renderItem={renderOption}
          renderSectionHeader={renderSectionHeader}
          keyExtractor={(item) => item.value}
        />
      );
    }
    return (
      <FlatList
        data={options as Option[]}
        renderItem={renderOption}
        keyExtractor={(item) => item.value}
      />
    );
  };

  const getLabelForValue = (value: string): string | undefined => {
    if (isSectioned) {
      const sections = options as Section[];
      for (const section of sections) {
        const option = section.data.find((o) => o.value === value);
        if (option) {
          return option.label;
        }
      }
    } else {
      const flatOptions = options as Option[];
      const option = flatOptions.find((o) => o.value === value);
      return option?.label;
    }
    return undefined;
  };

  const selectedLabels = isMultiSelect
    ? localSelectedValues
      .map((value) => getLabelForValue(value))
      .filter(Boolean)
      .join(', ')
    : getLabelForValue(localSelectedValues[0]);

  // Helper function to get the border radius based on the shape
  const getShapeStyle = (shape: ShapeType) => {
    switch (shape) {
    case Shape.Curve:
      return theme.borderRadius.curve; // square corners
    case Shape.Arch:
      return theme.borderRadius.arch; // square corners
    case Shape.Pill:
      return theme.borderRadius.pill; // rounded corners
    default:
      return theme.borderRadius.flat; // default to rounded
    }
  };

  const dropDownStyle: ViewStyle = {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: theme.colors.border, // Use border color from theme
    borderRadius: getShapeStyle(shape),
    backgroundColor: theme.colors.white, // Use white color from theme
    // width: 120
    position: 'relative'
  };

  return (
    <Row style={[customStyles.container, style]}>
      <View ref={selectRef} style={[dropDownStyle, style]}>
        <Pressable onPress={openDropdown} style={customStyles.selectContainer}>
          <Typography variant={TypographyVariant.Body} size={Size.Small} style={customStyles.selectedText}>
            {selectedLabels || placeholder}
          </Typography>
          <Icon
            name={isVisible ? 'chevron-up' : 'chevron-down'}
            library={IconLibraryName.FontAwesome5}
            size={15}
          />
        </Pressable>
      </View>

      {isVisible && (
        <Modal transparent={true} visible={isVisible}>
          <TouchableOpacity
            style={customStyles.modalOverlay}
            onPress={() => setIsVisible(false)}
          >
            <View
              style={[
                customStyles.dropdown,
                {
                  top: dropdownPosition.top,
                  left: dropdownPosition.left,
                  width: dropdownPosition.width,
                },
              ]}
            >
              {renderContent()}
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </Row>
  );
};