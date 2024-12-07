import React from 'react';
import {
  Image, StyleSheet, StyleProp, ImageStyle, 
  ViewStyle,
  TouchableOpacity
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Typography } from '../Typography';
import { FlexContainer } from '../FlexContainer';
import { Colors } from '@/constants/Colors';
import DogImgPlaceholder from '@/assets/images/dogPlaceholder.jpeg';

interface ImageUploadProps {
  image: string | null; // Image URI managed by the parent component
  // setImage: React.Dispatch<React.SetStateAction<string | null>>; // State setter function
  setImage: (imageUrl: string) => void;
  title?: string; // Custom title for the button
  containerStyle?: StyleProp<ViewStyle>; // Optional styles for the container
  imageStyle?: StyleProp<ImageStyle>; // Change to ImageStyle
  placeholder?: string; // Optional placeholder image URI
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  image,
  setImage,
  title = 'Upload',
  containerStyle,
  imageStyle,
  placeholder = DogImgPlaceholder
}) => {
  const pickImage = async () => {
    // Launch the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1], // Aspect ratio for a square image
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri); // Update the parent's image state
    }
  };

  return (
    <FlexContainer style={[containerStyle]}>
      <TouchableOpacity onPress={pickImage} style={styles.imgContainer}>
        {image ? (
          <Image source={{
            uri: image 
          }} style={[styles.image, imageStyle]} />
        ) : (
          <Image
            source={placeholder} // Show a placeholder if no image is selected
            style={[styles.image, imageStyle]}
          />
        )}
        <Typography variant='span'>{title}</Typography>
      </TouchableOpacity>
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 10
  },
  image: {
    width: 100, // Set width for the avatar
    height: 100, // Set height for the avatar
    borderRadius: 50, // Make the image circular
    marginTop: 10,
    borderColor: Colors.lightGrey,
    borderWidth: 1
  },
});