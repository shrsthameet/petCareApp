import {
  AntDesign,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
  Entypo
} from '@expo/vector-icons';
/** A high-level generic object. */

export type GenericObject<T = unknown> = { [key: string]: T }

/** A high-level error object. */
export interface ErrorObject {
    error: string,
}

/** Generic type to allow null. */
export type  Nullable<T> = T | null

/** Function with single parameter returning void*/
export type  FunctionWithParam<T> = (p: T) => void

/** Function with no parameter returning void*/
export type  FunctionWithNoParam = () => void

/** Function with no parameter but has returning type */
export type  FunctionWithNoParamButReturn<R> = () => R

/** Function with parameter and returning type */
export type  FunctionWithParamAndReturn<P, R> = (p: P) => R

export interface ApiResponseType<T>  {
  message: string,
  success: boolean,
  data: T
}

// Define theme
export type ThemeVariant = 'light' | 'dark';

// Define the available variants
export type TypographyTextAlign = 'left' | 'center' | 'right' | 'justify';
export type TypographyVariantsType = 'display' | 'headline' | 'title' | 'body' | 'caption';
export type TypographyFontType = 
'MontserratThin' |
'MontserratThinItalic' |
'MontserratMedium' |
'MontserratMediumItalic' |
'MontserratRegular' |
'MontserratSemiBold' |
'MontserratSemiBoldItalic' |
'MontserratBold' |
'MontserratBoldItalic' |
'MontserratExtraBold' |
'MontserratExtraBoldItalic';

// Define size
export type SizeType = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
export type PositionType = 'top' | 'right' | 'bottom' | 'left' | 'center';
export type ColorVariantType = 'default' | 'primary' | 'success' | 'secondary' | 'error' | 'info' | 'warning' | 'link';

// Define Flex types
export type FlexDirectionType = 'column' | 'row';
export type FlexJustifyContentType = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
export type FlexAlignItemsType = 'flex-start' | 'center' | 'flex-end' | 'stretch';
export type FlexWrapType = 'wrap' | 'nowrap' | 'wrap-reverse';

// Define button type
export type ButtonTitleType = 'Submit' | 'Edit' | 'Delete' | 'Save' | 'Update' | 'Register' | 'Next' | 'Previous' | 'Confirm' | 'Back';
export type ButtonVariantType = 'text' | 'outlined' | 'contained';

export type ShapeType = 'flat' | 'curve' | 'arch' | 'pill' | 'circle';

// Form fields type
export type TInput = 'email' | 'password' | 'text' | 'checkbox';
export type InputFieldsType = 'email' | 'password' | 'firstName' | 'lastName' | 'confirmPassword' | 'termsAndCondition';

// Auth Types
export type FormType = 'Login' | 'Register';

// Route types
export type AuthRoutesType = '/(auth)/register' | '/(auth)/login';
export type TabsRoute = '/(tabs)/(home)' | '/(tabs)/explore';
export type PetProfileSetUpRouteType = 
'/(petProfileSetup)' |
'/(petProfileSetup)/petTypeAndBreed' |
'/(petProfileSetup)/petBio' |
'/(petProfileSetup)/petInfo' |
'/(petProfileSetup)/petProfileComplete'
;
export type RoutesType = AuthRoutesType | TabsRoute | PetProfileSetUpRouteType;

// Date & time picker type
export type DateTimePickerModeType = 'date' | 'time' | 'datetime';
export type DateTimePickerDisplayType = 'default' | 'spinner' | 'calendar' | 'clock';

// Modal animation type
export type ModalAnimationType = 'none' | 'slide' | 'fade';

// Keyboard and Input mode type for both iOS and android
export type KeyboardType = 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad' | 'url';
export type InputModeType = 'search' | 'text' | 'email' | 'decimal' | 'numeric' | 'url' | 'none' | 'tel';

// Option list type
export type FormValueType = string | string[] | boolean | Date | number | null;
export interface IOptionList {
  label: string;
  value: FormValueType;
  imgSrc?: string;
}

// Define available icon libraries
export const IconLibraries = {
  Ionicons: Ionicons,
  MaterialIcons: MaterialIcons,
  MaterialCommunityIcons: MaterialCommunityIcons,
  FontAwesome: FontAwesome,
  FontAwesome5: FontAwesome5,
  FontAwesome6: FontAwesome6,
  Fontisto: Fontisto,
  AntDesign: AntDesign,
  Entypo: Entypo
};