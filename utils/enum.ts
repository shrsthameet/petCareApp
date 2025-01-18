export enum Fonts {
  Montserrat_Thin = 'MontserratThin',
  Montserrat_Thin_Italic = 'MontserratThinItalic',
  Montserrat_Medium = 'MontserratMedium',
  Montserrat_Medium_Italic = 'MontserratMediumItalic',
  Montserrat_Regular = 'MontserratRegular',
  Montserrat_SemiBold = 'MontserratSemiBold',
  Montserrat_SemiBold_Italic = 'MontserratSemiBoldItalic',
  Montserrat_Bold = 'MontserratBold',
  Montserrat_Bold_Italic = 'MontserratBoldItalic',
  Montserrat_Extra_Bold = 'MontserratExtraBold',
  Montserrat_Extra_Bold_Italic = 'MontserratExtraBoldItalic',
}

export enum Theme {
  Dark = 'dark',
  Light = 'light'
}

export enum Position {
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
  Left = 'left',
  Center = 'center',
}

export enum OSType {
  ANDROID = 'android',
  IOS = 'ios'
}

export enum Size {
  XSmall = 'xsmall',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  XLarge = 'xlarge',
}

export enum ButtonVariant {
  Text = 'text',
  Contained = 'contained',
  Outlined = 'outlined',
}

export enum ColorVariant {
  Default = 'default',
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
  Link = 'link'
}

export enum ButtonTitle {
  Submit = 'Submit',
  Edit = 'Edit',
  Delete = 'Delete',
  Save = 'Save',
  Update = 'Update',
  Login = 'Login',
  Register = 'Register',
  Next = 'Next',
  Previous = 'Previous',
  Confirm = 'Confirm',
  Back = 'Back'
}

export enum IconLibraryName {
  Ionicons = 'Ionicons',
  MaterialIcons = 'MaterialIcons',
  MaterialCommunityIcons = 'MaterialCommunityIcons',
  FontAwesome = 'FontAwesome',
  FontAwesome5 = 'FontAwesome5',
  FontAwesome6 = 'FontAwesome6',
  Fontisto = 'Fontisto',
  AntDesign = 'AntDesign',
  Entypo = 'Entypo'
}

export enum TypographyVariant {
  Display = 'display',
  Headline = 'headline',
  Title = 'title',
  Body = 'body',
  Caption = 'caption',
}

export enum FlexDirection {
  Column = 'column',
  Row = 'row'
}

export enum FlexJustifyContent {
  Start = 'flex-start',
  Center = 'center',
  End = 'flex-end',
  Between = 'space-between',
  Around = 'space-around',
  Evenly = 'space-evenly',
}

export enum FlexAlignItems {
  Start = 'flex-start',
  Center = 'center',
  End = 'flex-end',
  Stretch = 'stretch',
}

export enum FlexWrap {
  Wrap = 'wrap',
  Nowrap = 'nowrap',
  wrapReverse = 'wrap-reverse',
}

export enum Shape {
  Flat = 'flat',
  Curve = 'curve',
  Arch = 'arch',
  Pill = 'pill',
  Circle = 'circle'
}

export enum InputType {
  Email = 'email',
  Password = 'password',
  Text = 'text',
  Checkbox = 'checkbox'
}

export enum InputFields {
  FirstName = 'firstName',
  LastName = 'lastName',
  Email = 'email',
  Password = 'password',
  ConfirmPassword = 'confirmPassword',
  TermsAndCondition = 'termsAndCondition'
}

export enum Form {
  Login = 'Login',
  Register = 'Register'
}

// Auth Routes Enum
export enum AuthRoutes {
  REGISTER = '/(auth)/register',
  LOGIN = '/(auth)/login',
}

// Auth Routes Enum
export enum TabsRoutes {
  HOME = '/(tabs)/(home)',
}

// Pet Profile Setup Routes Enum
export enum PetProfileSetupRoutes {
  DEFAULT = '/(petProfileSetup)',
  PET_TYPE_AND_BREED = '/(petProfileSetup)/petTypeAndBreed',
  PET_BIO = '/(petProfileSetup)/petBio',
  PET_INFO = '/(petProfileSetup)/petInfo',
  PET_PROFILE_COMPLETE = '/(petProfileSetup)/petProfileComplete',
}

// Date & time picker enum
export enum DateTimePickerMode {
  Date = 'date',
  Time = 'time',
  DateTime = 'datetime'
}

export enum DateTimePickerDisplay {
  Default = 'default',
  Spinner = 'spinner',
  Calendar = 'calendar',
  Clock = 'clock'
}

// Modal animation enum
export enum ModalAnimation {
  None = 'none',
  Slide = 'slide',
  Fade = 'fade'
}

// Keyboard enum
export enum Keyboard {
  Default = 'default',
  NumberPad = 'number-pad',
  DecimalPad = 'decimal-pad',
  Numeric = 'numeric',
  EmailAddress = 'email-address',
  PhonePad = 'phone-pad',
  URL = 'url',
}

// Keyboard enum
export enum InputMode {
  None = 'none',
  Search = 'search',
  Text = 'text',
  Decimal = 'decimal',
  Numeric = 'numeric',
  Email = 'email',
  Tel = 'tel',
  URL = 'url',
}