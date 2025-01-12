import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, logout } from './authService';
import { ApiResponseType, User } from '@/utils/types';

interface APICallAuthStatusType {
  isLoading: boolean;
  message: string;
  isError: boolean;
  errMsg: string | unknown;
}

interface LoginStatusStateType extends APICallAuthStatusType {
  auth: User;
  isAuthenticated: boolean;
}
export interface AuthState {
  loginState: LoginStatusStateType;
  logoutState: APICallAuthStatusType;
}

// Adjust the return type of the function based on the parameter
function createAuthStateObject(includeAuth: true): LoginStatusStateType;
function createAuthStateObject(includeAuth: false): APICallAuthStatusType;

function createAuthStateObject(includeAuth: boolean): APICallAuthStatusType | LoginStatusStateType{
  return {
    isLoading: false,
    ...(includeAuth && {
      auth: {
        _id: '',
        fullName: '',
        email: '',
        roles: [],
        token: ''
      },
      isAuthenticated: false,
    }),
    message: '',
    isError: false,
    errMsg: ''
  };
}

const initialState: AuthState = {
  loginState: createAuthStateObject(true),
  logoutState: createAuthStateObject(false)
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state) => {
      state.loginState.isAuthenticated = true;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loginState.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<ApiResponseType<User>>) => {
        state.loginState.isLoading = false;
        if (action.payload.success) {
          state.loginState.message = action.payload.message;
          state.loginState.auth = action.payload.data;
          state.loginState.isAuthenticated = true;
        } else {
          state.loginState.errMsg = action.payload.message;
          state.loginState.isError = true;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loginState.isLoading = false;
        state.loginState.isError = true;
        state.loginState.errMsg = action.payload;
      })

      // Logout
      .addCase(logout.pending, (state) => {
        state.logoutState.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action: PayloadAction<ApiResponseType<null>>) => {
        state.logoutState.isLoading = false;
        if (action.payload.success) {
          state.loginState.message = action.payload.message;
          state.loginState.auth = {
            _id: '',
            fullName: '',
            email: '',
            roles: [],
            token: ''
          };
          state.loginState.isAuthenticated = false;
        } else {
          state.logoutState.errMsg = action.payload.message;
          state.logoutState.isError = true;
        }
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutState.isLoading = false;
        state.logoutState.isError = true;
        state.logoutState.errMsg = action.payload;
      });
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;