import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button } from '@/components/CoreUI/Button';
import { Dropdown } from '@/components/CoreUI/Dropdown';
import { Column } from '@/components/CoreUI/Flex';
import { ImageUpload } from '@/components/CoreUI/ImageUpload';
import { Typography } from '@/components/CoreUI/Typography';
import { globalStyles } from '@/styles/global';
import {
  ButtonTitle, ButtonVariant, ColorVariant, Size, TypographyVariant 
} from '@/utils/enum';

interface IFormState {
  text: string;
  description: string;
  image: string | null;
  petType: string | string[];
}

const EditPet = () => {
  const [formState, setFormState] = useState<IFormState>({
    text: '',
    description: '',
    image: null,
    petType: '',
  });
  const {
    text,
    description,
    image,
    petType
  } = formState;

  const handleSubmit = () => {
    console.log('formState', formState);
  };

  const sections = [
    {
      title: 'Dog',
      data: [
        {
          label: 'Golden Retriever', value: 'goldenRetriever' 
        },
        {
          label: 'Border Collie', value: 'borderCollie'
        },
        {
          label: 'German Shepherd', value: 'germanShepherd'
        },
        {
          label: 'Labrador', value: 'labrador'
        },
      ],
    },
    {
      title: 'Cat',
      data: [
        {
          label: 'Ginger', value: 'ginger' 
        },
        {
          label: 'Ragdoll', value: 'ragdoll' 
        },
        {
          label: 'Persian Cat', value: 'persianCat' 
        },
        {
          label: 'Siberian Cat', value: 'siberianCat' 
        },
      ],
    },
  ];

  // Single change handler
  const handleChange = (name: keyof typeof formState, value: string | string [] | null) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  console.log('formState', formState);
  return (
    <ScrollView>
      <Column gap={15} style={[globalStyles.horizontalPadding, styles.container]}>

        <Column alignItems='center'>
          <ImageUpload image={image} setImage={(value) => handleChange('image', value)} />
        </Column>

        <Column>
          <Typography variant={TypographyVariant.Body} size={Size.Medium}>Name:</Typography>
          {/* <Input
          value={text}
          onChangeText={(value) => handleChange('text', value)}
          placeholder='Enter a name'
          keyboardType='numeric'
          iconName='person'
          iconLibrary={IconLibraryName.MaterialIcons}
          iconSize={25}
          iconColor='black'
        /> */}
        </Column>
        <Column>
          <Typography variant={TypographyVariant.Body} size={Size.Medium}>Description:</Typography>
          {/* <Input
          value={description}
          onChangeText={(value) => handleChange('description', value)}
          placeholder='Enter description'
          multiline={true}
          numberOfLines={4}
        /> */}
        </Column>

        <Column>
          <Dropdown
            selectedValues={petType}
            options={sections}
            onSelect={(value) => handleChange('petType', value)}
            isSectioned={true}
          />
        </Column>

        <Column gap={10}>
          <Button
            onPress={handleSubmit}
            title={ButtonTitle.Update}
            variant={ButtonVariant.Contained}
            color={ColorVariant.Primary}
          />

          <Button 
            onPress={handleSubmit}
            title={ButtonTitle.Delete}
            variant={ButtonVariant.Contained}
            color={ColorVariant.Error}
          />
        </Column>
      </Column>
    </ScrollView>
  );
};

export default EditPet;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20
  },
  image: {
    width: 200,
    height: 800,
  },
});
