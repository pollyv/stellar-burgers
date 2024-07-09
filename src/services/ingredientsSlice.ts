import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

// Интерфейс ингредиентов
interface IIngredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: IIngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

// Создаем асинхронный Thunk для получения данных ингредиентов
export const getIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

// Создаем слайс для управления состоянием ингредиентов
const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    // Селекторы для получения частей состояния
    getIngredientsSelector: (state) => state.ingredients,
    getLoadingSelector: (state) => state.isLoading,
    getIngredientsErrorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    // Дополнительные обработчики для асинхронных Thunk
    builder
      .addCase(getIngredients.pending, (state) => {
        // Обработчик для состояния "ожидание"
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        // Обработчик для успешного выполнения запроса
        state.ingredients = action.payload;
        state.isLoading = false;
      })
      .addCase(getIngredients.rejected, (state) => {
        // Обработчик для ошибки при выполнении запроса
        state.isLoading = false;
        state.error = 'Ingredients Error';
      });
  }
});

// Экспортируем редьюсер и селекторы
export const ingredientsReducer = ingredientsSlice.reducer;
export const ingredientsSliceName = ingredientsSlice.name;
export const {
  getIngredientsSelector,
  getLoadingSelector,
  getIngredientsErrorSelector
} = ingredientsSlice.selectors;
