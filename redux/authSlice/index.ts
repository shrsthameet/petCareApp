import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/utils/types';

interface AuthState {
  // token: string | null;
  isAuthenticated: boolean;
  user: User;
}

const initialState: AuthState = {
  user: {
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    roles: [],
    token: ''
  },
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearCredentials: (state) => {
      state.user = {
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        roles: [],
        token: ''
      };
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;