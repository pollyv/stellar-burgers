import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';
import {
  TLoginData,
  TRegisterData,
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  updateUserApi
} from '@api';
import { TUser } from '@utils-types';

// Интерфейс для состояния аутентификации пользователя
interface IAuthUser {
  userData: TUser | null;
  isAuthChecked: boolean;
  loginUserRequest: boolean;
  errorRegistration: string | null;
  errorLogin: string | null;
  errorUpdate: string | null;
  errorLogout: string | null;
}

// Начальное состояние
const initialState: IAuthUser = {
  userData: null,
  isAuthChecked: false,
  loginUserRequest: false,
  errorRegistration: null,
  errorLogin: null,
  errorUpdate: null,
  errorLogout: null
};

// Thunk для получения данных пользователя
export const fetchUserData = createAsyncThunk(
  'authUser/fetchUserData',
  async () => getUserApi()
);

// Thunk для проверки аутентификации пользователя
export const verifyUserAuth = createAsyncThunk(
  'authUser/verifyUserAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      await dispatch(fetchUserData());
    }
    dispatch(setAuthChecked());
  }
);

// Thunk для входа пользователя
export const loginUser = createAsyncThunk(
  'authUser/loginUser',
  async (loginData: TLoginData, { rejectWithValue }) => {
    const data = await loginUserApi(loginData);
    if (!data?.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

// Thunk для регистрации пользователя
export const registerUser = createAsyncThunk(
  'authUser/registerUser',
  async (registerData: TRegisterData, { rejectWithValue }) => {
    const data = await registerUserApi(registerData);
    if (!data?.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

// Thunk для обновления данных пользователя
export const updateUser = createAsyncThunk(
  'authUser/updateUser',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

// Thunk для запроса сброса пароля
export const forgotPassword = createAsyncThunk(
  'authUser/forgotPassword',
  async (data: { email: string }) => forgotPasswordApi(data)
);

// Thunk для сброса пароля
export const resetPassword = createAsyncThunk(
  'authUser/resetPassword',
  async (data: { password: string; token: string }) => resetPasswordApi(data)
);

// Thunk для выхода пользователя
export const logoutUser = createAsyncThunk('authUser/logoutUser', async () =>
  logoutApi()
);

const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    // Редьюсер для установки флага проверки аутентификации
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  selectors: {
    getUserData: (state) => state.userData,
    getAuthChecked: (state) => state.isAuthChecked,
    getLoginUserRequest: (state) => state.loginUserRequest,
    getErrorRegistration: (state) => state.errorRegistration,
    getErrorLogin: (state) => state.errorLogin,
    getErrorUpdate: (state) => state.errorUpdate
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userData = action.payload.user;
      })
      .addCase(verifyUserAuth.pending, (state) => {
        state.errorLogin = null;
        state.errorRegistration = null;
        state.errorLogout = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.errorLogin = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isAuthChecked = true;
        state.loginUserRequest = false;
        state.errorLogin = null;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isAuthChecked = true;
        state.errorLogin = 'Access to the personal account Error';
        state.loginUserRequest = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.loginUserRequest = true;
        state.errorRegistration = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loginUserRequest = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.errorRegistration = 'Registration Error';
        state.loginUserRequest = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.loginUserRequest = true;
        state.userData = null;
        state.errorUpdate = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loginUserRequest = false;
        state.userData = action.payload.user;
      })
      .addCase(updateUser.rejected, (state) => {
        state.loginUserRequest = false;
        state.errorUpdate = 'Update User Data Error';
      })
      .addCase(logoutUser.pending, (state) => {
        state.loginUserRequest = true;
        state.errorLogout = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loginUserRequest = false;
        state.userData = null;
        localStorage.clear();
        deleteCookie('accessToken');
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loginUserRequest = false;
        state.errorLogout = 'Logout Error';
      });
  }
});

// Экспорт редьюсера, селекторов и пр.
export const authUserReducer = authUserSlice.reducer;
export const {
  getUserData,
  getAuthChecked,
  getLoginUserRequest,
  getErrorRegistration,
  getErrorLogin,
  getErrorUpdate
} = authUserSlice.selectors;
export const { setAuthChecked } = authUserSlice.actions;
export const authUserSliceName = authUserSlice.name;
