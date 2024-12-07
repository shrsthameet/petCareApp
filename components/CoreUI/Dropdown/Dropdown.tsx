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
} from 'react-native';
import { FlexContainer } from '../FlexContainer';
import { Icon } from '../Icons/Icons';
import { dropdownStyles } from './Dropdown.style';
import { IconLibraryName, OSType } from '@/utils/enum';

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
  isRounded?: boolean; // Flag to display rounded corner
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = 'Select options',
  onSelect,
  selectedValues = '',
  style,
  isSectioned = false,
  isMultiSelect = false,
  isRounded = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [localSelectedValues, setLocalSelectedValues] = useState<string[]>([]);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0, left: 0, width: 0
  });
  const selectRef = useRef<TouchableOpacity>(null); // Use TouchableOpacity ref

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
        // Remove value if already selected
        updatedSelectedValues = updatedSelectedValues.filter((item) => item !== value);
      } else {
        // Add value if not already selected
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
    if (selectRef.current) {
      selectRef.current.measure((fx, fy, width, height, px, py) => {
        // Adjust the top position slightly for Android to align properly
        const additionalOffset = Platform.OS === OSType.ANDROID ? -22 : 5; // Adjust as needed for Android
        setDropdownPosition({
          top: py + height + additionalOffset, // Position the dropdown below the select box
          left: px,
          width: width,
        });
      });
    }
    setIsVisible(true);
  };

  const renderOption = ({ item }: { item: Option }) => (
    <TouchableOpacity onPress={() => handleOptionPress(item.value)} style={[dropdownStyles.option, localSelectedValues.includes(item.value) && dropdownStyles.selectedBackground]}>
      <Text style={dropdownStyles.optionText}>{item.label}</Text>
      {localSelectedValues.includes(item.value) && (
        <Icon name='check' library={IconLibraryName.FontAwesome5} size={15} />
      )}
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section }: { section: Section }) => (
    <Text style={dropdownStyles.sectionHeader}>{section.title}</Text>
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

  return (
    <FlexContainer style={[dropdownStyles.container, style]}>
      <Pressable ref={selectRef} onPress={openDropdown} 
        style={[
          dropdownStyles.select, isRounded && dropdownStyles.rounded
        ]}
      >
        <Text style={dropdownStyles.selectedText}>
          {selectedLabels ? selectedLabels : placeholder}
        </Text>
        <Icon name={isVisible ? 'chevron-up' : 'chevron-down'} library={IconLibraryName.FontAwesome5} size={15} />
      </Pressable>

      {isVisible && (
        <Modal transparent={true} visible={isVisible} animationType='fade'>
          <TouchableOpacity
            style={dropdownStyles.modalOverlay}
            onPress={() => setIsVisible(false)}
          >
            <View
              style={[
                dropdownStyles.dropdown,
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
    </FlexContainer>
  );
};
