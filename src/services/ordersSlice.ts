import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

// Интерфейс состояния для среза заказов
export interface IOrdersState {
  orders: TOrder[];
  error: string | null;
}

// Начальное состояние
const initialState: IOrdersState = {
  orders: [],
  error: null
};

// Создаем асинхронную Thunk для получения заказов
const fetchOrders = createAsyncThunk('orders/fetchOrders', async () =>
  getOrdersApi()
);

// Создаем слайс для управления состоянием заказов
export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    // Дополнительные обработчики для асинхронной Thunk
    builder
      .addCase(fetchOrders.pending, (state) => {
        // Обработчик для состояния "ожидание"
        state.orders = [];
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        // Обработчик для успешного выполнения запроса
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        // Обработчик для ошибки при выполнении запроса
        state.error = action.error.message || 'Order history Error';
      });
  }
});

// Экспортируем редьюсер и селектор для использования в приложении
export const ordersReducer = ordersSlice.reducer;
export const { getOrders } = ordersSlice.selectors;
