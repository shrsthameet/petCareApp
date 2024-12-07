import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';
import { ITheme } from '@/utils/types';
import { darkTheme, lightTheme } from '@/styles/theme/theme';

type ThemeState = {
  theme: ITheme;
  isDarkMode: boolean;
};

const initialState: ThemeState = {
  theme: Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme,
  isDarkMode: Appearance.getColorScheme() === 'dark',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      state.theme = state.isDarkMode ? darkTheme : lightTheme;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.isDarkMode = action.payload === 'dark';
      state.theme = action.payload === 'dark' ? darkTheme : lightTheme;
    },
    setSystemTheme: (state) => {
      const isDarkMode = Appearance.getColorScheme() === 'dark';
      state.isDarkMode = isDarkMode;
      state.theme = isDarkMode ? darkTheme : lightTheme;
    },
  },
});

export const { toggleTheme, setTheme, setSystemTheme } = themeSlice.actions;

export default themeSlice.reducer;