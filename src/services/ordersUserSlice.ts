import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

// Интерфейс для состояния пользовательских заказов
export interface IOrderUserState {
  orders: TOrder[];
  error: string | null;
}

// Начальное состояние
const initialState: IOrderUserState = {
  orders: [],
  error: null
};

// Thunk для получения заказов пользователя
export const getUserOrders = createAsyncThunk(
  'userOrders/getUserOrders', // Уникальная строка действия
  async () => getOrdersApi() // Функция, вызывающая API для получения данных
);

// Слайс заказов пользователя
export const handleUserOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  selectors: {
    getUserOrdersList: (state) => state.orders,
    getUserOrdersError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.orders = [];
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state) => {
        state.error = 'Orders history Error';
      });
  }
});

// Экспортируем редюсер, слайс и селекторы
export const ordersReducer = handleUserOrdersSlice.reducer;
export const ordersSliceName = handleUserOrdersSlice.name;
export const { getUserOrdersList, getUserOrdersError } =
  handleUserOrdersSlice.selectors;
