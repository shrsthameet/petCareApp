import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';
import { ITheme, ThemeVariant } from '@/utils/types';
import { darkTheme, lightTheme } from '@/styles/theme';
import { Theme } from '@/utils/enum';

type ThemeState = {
  theme: ITheme;
  isDarkMode: boolean;
};

const initialState: ThemeState = {
  theme: Appearance.getColorScheme() === Theme.Dark ? darkTheme : lightTheme,
  isDarkMode: Appearance.getColorScheme() === Theme.Dark,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      state.theme = state.isDarkMode ? darkTheme : lightTheme;
    },
    setTheme: (state, action: PayloadAction<ThemeVariant>) => {
      state.isDarkMode = action.payload === Theme.Dark;
      state.theme = action.payload === Theme.Dark ? darkTheme : lightTheme;
    },
    setSystemTheme: (state) => {
      const isDarkMode = Appearance.getColorScheme() === Theme.Dark;
      state.isDarkMode = isDarkMode;
      state.theme = isDarkMode ? darkTheme : lightTheme;
    },
  },
});

export const { toggleTheme, setTheme, setSystemTheme } = themeSlice.actions;

export default themeSlice.reducer;