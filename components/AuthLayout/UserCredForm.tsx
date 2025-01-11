import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Pressable } from 'react-native';
import { Column, Row } from '../CoreUI/Flex';
import { Typography } from '../CoreUI/Typography';
import { Input } from '../CoreUI/Input';
import { Button } from '../CoreUI/Button';
import {
  FlexJustifyContent,
  FlexAlignItems,
  TypographyVariant,
  Size,
  Fonts,
  Shape,
  ButtonVariant,
  IconLibraryName,
  Position,
  FormTitles
} from '@/utils/enum';
import { RootState } from '@/redux/rootReducer';
import { FormTitlesType, InputFieldType } from '@/utils/types';
import { FormFieldsData } from '@/utils/constants';

interface FormField {
  name: string;
  title: string;
  type: InputFieldType; // Add more types if needed
  placeholder: string;
  value: string;
}

interface UserCredformProps {
  formTitle?: FormTitlesType;
  formFields: FormField[];
  handleChange: (field: string, value: string) => void;
  onSubmit: () => void;
  btnTitle: string;
  handleClick: () => void;
}

export const UserCredForm: FC<UserCredformProps> = ({
  formTitle,
  formFields,
  handleChange,
  onSubmit,
  btnTitle,
  handleClick
}) => {
  const { theme } = useSelector((state: RootState) => state.theme);

  return (
    <>
      <Column flex={1} gap={40} justifyContent={FlexJustifyContent.Center}>
        <Column alignItems={FlexAlignItems.Center}>
          <Typography variant={TypographyVariant.Headline} size={Size.Large} fontFamilyStyle={Fonts.Montserrat_SemiBold}>
            {formTitle}
          </Typography>
        </Column>
    
        <Column gap={25}>
          {formFields.map((item, index) => (
            <Column key={index}>
              <Typography variant={TypographyVariant.Body} size={Size.Small} fontFamilyStyle={Fonts.Montserrat_Medium}>
                {item.title}
              </Typography>
              <Input
                value={item.value}
                secureTextEntry={item.type === 'password'}
                placeholder={item.placeholder}
                onChangeText={(value) => handleChange(item.name, value)}
                shape={Shape.Arch}
              />
            </Column>
          ))}

          <Column gap={15} alignItems={FlexAlignItems.Center}>
            <Row>
              <Typography
                variant={TypographyVariant.Caption}
                size={Size.Large}
                fontFamilyStyle={Fonts.Montserrat_Medium}
                color={theme.colors.onBackground}
              >
                {formTitle === FormTitles.Login ? FormFieldsData.Login.member : FormFieldsData.Register.member}
              </Typography>
              <Pressable onPress={handleClick}>
                <Typography
                  variant={TypographyVariant.Caption}
                  size={Size.Large}
                  fontFamilyStyle={Fonts.Montserrat_Medium}
                  color={theme.colors.primary}
                >
                  {formTitle === FormTitles.Login ? FormFieldsData.Login.action.title : FormFieldsData.Register.action.title}
                </Typography>
              </Pressable>
            </Row>
            {formTitle === FormTitles.Login && (
              <Typography
                variant={TypographyVariant.Caption}
                size={Size.Large}
                fontFamilyStyle={Fonts.Montserrat_Medium}
                color={theme.colors.primary}
              >
                {FormFieldsData.Login.resetPassword.title}
              </Typography>
            )}
          </Column>
        </Column>
    
      </Column>
      <Column>
        <Button
          title={btnTitle}
          onPress={onSubmit}
          variant={ButtonVariant.Contained}
          shape={Shape.Arch}
          iconName='arrowright'
          iconLibrary={IconLibraryName.AntDesign}
          showIcon
          iconPosition={Position.Right}
        />
      </Column>
    </>
  );
};
