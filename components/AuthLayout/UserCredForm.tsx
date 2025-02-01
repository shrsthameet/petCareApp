import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { Pressable } from 'react-native';
import { Column, Row } from '../CoreUI/Flex';
import { Typography } from '../CoreUI/Typography';
import { Input } from '../CoreUI/Input';
import { Button } from '../CoreUI/Button';
import { Checkbox } from '../CoreUI/Checkbox';
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
  Form,
  InputType
} from '@/utils/enum';
import { RootState } from '@/redux/rootReducer';
import { FormType, TInput } from '@/utils/types';
import { FormData } from '@/utils/constants';

interface FormField {
  name: string;
  title: string;
  type: TInput; // Add more types if needed
  placeholder: string;
  value?: string;
  checked?: boolean;
  desc?: string;
}

interface UserCredformProps {
  formFields: FormField[];
  handleChange: (field: string, value: string) => void;
  onSubmit: () => void;
  btnTitle: string;
  handleClick: () => void;
  formType: FormType;
  isLoading?: boolean;
}

export const UserCredForm: FC<UserCredformProps> = ({
  formFields,
  handleChange,
  onSubmit,
  btnTitle,
  handleClick,
  formType,
  isLoading
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const { theme } = useSelector((state: RootState) => state.theme);

  const renderInput = (item: FormField, colFlex: number) => (
    <Column flex={colFlex} key={item.name}>
      {item.type === InputType.Checkbox ? (
        <Checkbox
          checked={isChecked}
          onChange={(checked) => setIsChecked(checked)}
          label={item.desc}
          size={Size.Large}
        />
      ) : (
        <Input
          value={item.value ? item.value : ''}
          secureTextEntry={item.type === 'password'}
          placeholder={item.placeholder}
          onChangeText={(value) => handleChange(item.name, value)}
          shape={Shape.Pill}
        />
      )}
    </Column>
  );

  return (
    <>
      <Column flex={1} gap={40} justifyContent={FlexJustifyContent.Center}>
        <Column gap={10}>
          <Typography variant={TypographyVariant.Headline} size={Size.Small} fontFamilyStyle={Fonts.Montserrat_Bold}>
            {FormData[formType].formTitle}
          </Typography>
          <Typography variant={TypographyVariant.Headline} size={Size.Large} fontFamilyStyle={Fonts.Montserrat_Bold}>
            {FormData[formType].subTitle}
          </Typography>
          <Typography variant={TypographyVariant.Caption} size={Size.Medium} fontFamilyStyle={Fonts.Montserrat_Medium}>
            {FormData[formType].desc}
          </Typography>
        </Column>

        <Column gap={30}>
          <Column gap={10}>
            <Row justifyContent={FlexJustifyContent.Between}>
              {formFields
                .filter((item) => item.name === 'firstName' || item.name === 'lastName')
                .map((item) => renderInput(item, 1))}
            </Row>
            {formFields
              .filter((item) => item.name !== 'firstName' && item.name !== 'lastName')
              .map((item) => renderInput(item, 0))}
          </Column>

          <Column gap={15} alignItems={FlexAlignItems.Center}>
            <Row>
              <Typography
                variant={TypographyVariant.Caption}
                size={Size.Large}
                fontFamilyStyle={Fonts.Montserrat_Medium}
                color={theme.colors.onText}
              >
                {FormData[formType].member}
              </Typography>
              <Pressable onPress={handleClick}>
                <Typography
                  variant={TypographyVariant.Caption}
                  size={Size.Large}
                  fontFamilyStyle={Fonts.Montserrat_Medium}
                  color={theme.colors.primary}
                >
                  {FormData[formType].action.title}
                </Typography>
              </Pressable>
            </Row>
            {formType === Form.Login && (
              <Typography
                variant={TypographyVariant.Caption}
                size={Size.Large}
                fontFamilyStyle={Fonts.Montserrat_Medium}
                color={theme.colors.primary}
              >
                {FormData.Login.resetPassword.title}
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
          shape={Shape.Pill}
          iconName='arrowright'
          iconLibrary={IconLibraryName.AntDesign}
          showIcon
          iconPosition={Position.Right}
          isLoading={isLoading}
        />
      </Column>
    </>
  );
};
