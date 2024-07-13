import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';

// Определяем интерфейс
export interface IFeedState {
  orders: TOrder[];
  total: number | null;
  totalToday: number | null;
  error: string | null;
}

// Начальное состояние
const initialState: IFeedState = {
  orders: [],
  total: null,
  totalToday: null,
  error: null
};

// Создаем асинхронный Thunk для получения данных о ленте заказов
export const fetchFeed = createAsyncThunk('feed/fetchFeed', async () =>
  getFeedsApi()
);

// Создаем слайс для управления состоянием ленты заказов
export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    // Селекторы для получения частей состояния
    getFeedState: (state) => state,
    getFeedOrders: (state) => state.orders,
    getErrorFeed: (state) => state.error
  },
  extraReducers: (builder) => {
    // Дополнительные обработчики для асинхронных Thunk
    builder
      .addCase(fetchFeed.pending, (state) => {
        // Обработчик для состояния "ожидание"
        state.orders = [];
        state.total = null;
        state.totalToday = null;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        // Обработчик для успешного выполнения запроса
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        // Обработчик для ошибки при выполнении запроса
        state.error = 'Orders list Error';
      });
  }
});

// Экспортируем редьюсер и селекторы
export const feedReducer = feedSlice.reducer;
export const { getFeedState, getFeedOrders, getErrorFeed } =
  feedSlice.selectors;
export const feedSliceName = feedSlice.name;
