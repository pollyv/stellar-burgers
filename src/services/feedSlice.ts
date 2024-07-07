import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';

// Определяем интерфейс
export interface IFeedState {
  orders: TOrder[];
  totalSum: {
    totalToDay: number | null;
    totalAllTime: number | null;
  };
  error: string | null;
}

// Начальное состояние
const initialState: IFeedState = {
  orders: [],
  totalSum: {
    totalToDay: null,
    totalAllTime: null
  },
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
    getFeed: (state) => state,
    getOrders: (state) => state.orders,
    getTotalSum: (state) => state.totalSum
  },
  extraReducers: (builder) => {
    // Дополнительные обработчики для асинхронных Thunk
    builder
      .addCase(fetchFeed.pending, (state) => {
        // Обработчик для состояния "ожидание"
        state.orders = [];
        state.totalSum = {
          totalToDay: null,
          totalAllTime: null
        };
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        // Обработчик для успешного выполнения запроса
        state.orders = action.payload.orders;
        state.totalSum = {
          totalToDay: action.payload.totalToday,
          totalAllTime: action.payload.total
        };
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        // Обработчик для ошибки при выполнении запроса
        state.error = action.error.message || 'Orders list Error';
      });
  }
});

// Экспортируем редьюсер и селекторы
export const feedReducer = feedSlice.reducer;
export const { getFeed, getOrders, getTotalSum } = feedSlice.selectors;
