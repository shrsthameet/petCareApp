import React, { FC, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { globalStyles } from '@/styles/global';
import { Column, Row } from '@/components/CoreUI/Flex';
import { Typography } from '@/components/CoreUI/Typography';
import {
  FlexDirection,
  FlexJustifyContent, Shape, Size, TypographyVariant 
} from '@/utils/enum';
import { Input } from '@/components/CoreUI/Input';
import { RootState } from '@/redux/rootReducer';
import { getPetProfileSetupStyles } from '@/screens/petProfileSetUp/petProfileSetup.style';
import { ProgressBar } from '@/components/CoreUI/ProgressBar';
import { ImageUpload } from '@/components/CoreUI/ImageUpload';
import { RadioButton } from '@/components/CoreUI/RadioButton';
import { CustomDateTimePicker } from '@/components/CoreUI/CustomDateTimePicker';
import { Select } from '@/components/CoreUI/Select';

interface IInitialState {
  name: string;
  gender: string;
  dateOfBirth: string;
  dateOfAdoption: string;
  image: string;
  adoption: string;
  step: number;
}

const options = [
  {
    label: 'Adopted', value: 'adopted' 
  },
  {
    label: 'Not adopted', value: 'notAdopted' 
  },
];

const PetBio: FC = () => {
  // const [date, setDate] = useState(new Date());
  // const [show, setShow] = useState(false);

  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   setShow(Platform.OS === 'ios'); // Keep the picker open on iOS
  //   setDate(currentDate);
  // };

  // const showMode = () => {
  //   setShow(true);
  // };

  const { theme } = useSelector((state: RootState) => state.theme);

  const styles = getPetProfileSetupStyles(theme);

  const [initialState, setInitialState] = useState<IInitialState>({
    name: '',
    gender: '',
    dateOfBirth: '',
    dateOfAdoption: '',
    image: '',
    adoption: 'notAdopted',
    step: 2
  });

  const { name, gender, dateOfBirth, dateOfAdoption, image, adoption } = initialState;

  // Handle change
  const handleChange = (field: string, value: string) => {
    setInitialState((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };
  
  return (
    <SafeAreaView style={globalStyles.container}>
      <Column gap={40} style={styles.container}>

        <Column gap={10}>
          <ProgressBar progress={66.66} height={4} />
          <Row justifyContent={FlexJustifyContent.Between}>
            <Typography variant={TypographyVariant.Body} size={Size.Small}>
              Step
            </Typography>
            <Typography variant={TypographyVariant.Body} size={Size.Small}>
              2 / 3
            </Typography>
          </Row>
        </Column>

        <Column gap={20}>
          <Column>
            <ImageUpload
              image={image}
              setImage={(value) => handleChange('image', value)}
              title='Upload image'
            />
          </Column>

          <Column gap={8}>
            <Typography variant={TypographyVariant.Body} size={Size.Small} style={{
              paddingHorizontal: 5
            }}>
              My pet name is
            </Typography>

            <Input
              value={name}
              placeholder={'Enter your pet name'}
              onChangeText={(value) => handleChange('name', value)}
              shape={Shape.Pill}
            />
          </Column>

          <Column gap={8}>
            <Typography variant={TypographyVariant.Body} size={Size.Small} style={{
              paddingHorizontal: 5
            }}>
              Date of birth
            </Typography>
            <CustomDateTimePicker onDateChange={(date) => console.log('date', date)} mode='date' />
          </Column>

          <Column gap={10}>
            <Typography variant={TypographyVariant.Body} size={Size.Small} style={{
              paddingHorizontal: 5
            }}>
              Gender
            </Typography>
            <Select
              options={[{
                label: 'Male', value: 'male'
              }, {
                label: 'Female', value: 'female'
              }
              ]}
              selectedValue={gender}
              placeholder='Select gender'
              onSelect={(value) => handleChange('gender', value)}
            />
          </Column>

          <Column>
            <Typography variant={TypographyVariant.Body} size={Size.Small} style={{
              paddingHorizontal: 5
            }}>
              My pet is
            </Typography>
            <RadioButton
              options={options}
              selectedValue={adoption}
              onValueChange={(value) => handleChange('adoption', value)}
              direction={FlexDirection.Row}
            />
          </Column>

          {adoption === 'adopted' ? (
            <Column gap={8}>
              <Typography variant={TypographyVariant.Body} size={Size.Small} style={{
                paddingHorizontal: 5
              }}>
              Date of adoption
              </Typography>
              <CustomDateTimePicker onDateChange={(date) => console.log('date', date)} mode='date' />
            </Column>
          ) : null}
        </Column>

      </Column>
    </SafeAreaView>
  );
};

export default PetBio;