import { getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
export const fetchDetailesOrder = createAsyncThunk(
  'orderDetailes/fetchDetailOrder',
  async (numberOrder: number, { dispatch }) => {
    dispatch(clearOrderState());
    return getOrderByNumberApi(numberOrder);
  }
);

// Создаем слайс для управления состоянием детализации заказа
const orderDetailesSlice = createSlice({
  name: 'orderDetailes',
  initialState,
  reducers: {
    clearOrderState: (state) => {
      state.order = null;
    }
  },
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
        state.order = action.payload.orders[0];
      })
      .addCase(fetchDetailesOrder.rejected, (state, action) => {
        // Обработчик для ошибки при выполнении запроса
        state.error = 'Orders detailes Error';
      });
  }
});

// Экспортируем редьюсер и селектор для использования в приложении
export const orderDetailesReducer = orderDetailesSlice.reducer;
export const { getOrder } = orderDetailesSlice.selectors;
export const { clearOrderState } = orderDetailesSlice.actions;
export const orderDetailesName = orderDetailesSlice.name;
