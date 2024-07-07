import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

// Определяем интерфейс состояния для детализации заказа
interface IOrderDetailesState {
  order: TOrder | null;
  error: string | null;
}

// Начальное состояние
export const initialState: IOrderDetailesState = {
  order: null,
  error: null
};

// Создаем асинхронный Thunk для получения детализации заказа
const fetchDetailesOrder = createAsyncThunk(
  'orderDetail/fetchDetailOrder',
  async (id: string[]) => orderBurgerApi(id)
);

// Создаем слайс для управления состоянием детализации заказа
export const orderDetailesSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {},
  selectors: {
    getOrder: (state) => state.order
  },
  extraReducers: (builder) => {
    // Дополнительные обработчики для асинхронных Thunk
    builder
      .addCase(fetchDetailesOrder.pending, (state) => {
        // Обработчик для состояния "ожидание"
        state.error = null;
      })
      .addCase(fetchDetailesOrder.fulfilled, (state, action) => {
        // Обработчик для успешного выполнения запроса
        state.order = action.payload.order;
      })
      .addCase(fetchDetailesOrder.rejected, (state, action) => {
        // Обработчик для ошибки при выполнении запроса
        state.error = action.error.message || 'Orders detailes Error';
      });
  }
});

// Экспортируем редьюсер и селектор для использования в приложении
export const orderDetailesReducer = orderDetailesSlice.reducer;
export const { getOrder } = orderDetailesSlice.selectors;
