import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

// Интерфейс состояния конструктора бургера
export interface IConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

// Начальное состояние
export const initialState: IConstructorState = {
  bun: null,
  ingredients: []
};

// Создаем слайс для управления состоянием конструктора бургера
export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredients: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          // Если добавляем булочку, заменяем текущую
          state.bun = action.payload;
        } else {
          // Иначе добавляем ингредиент в список
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = uuidv4(); // Генерируем уникальный id для ингредиента
        return { payload: { ...ingredient, id } }; // Возвращаем payload с новым id
      }
    },
    // Редьюсер для удаления ингредиента из конструктора
    removeIngredients: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    // Редьюсер для очистки конструктора
    clearIngredients: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    // Редьюсер для изменения порядка ингредиентов
    changeIngredientsOrder: (state, action) => {
      const initialElement = state.ingredients[action.payload.initialIndex];
      state.ingredients[action.payload.initialIndex] =
        state.ingredients[action.payload.finishIndex];
      state.ingredients[action.payload.finishIndex] = initialElement;
    }
  },
  selectors: {
    // Селектор для получения ингредиентов из конструктора
    getIngredientsSelector: (state) => state
  }
});

// Экспортируем редьюсер и селекторы
export const constructorReducer = burgerConstructorSlice.reducer;
export const constructorSliceName = burgerConstructorSlice.name;
export const {
  addIngredients,
  removeIngredients,
  clearIngredients,
  changeIngredientsOrder
} = burgerConstructorSlice.actions;
export const BurgerConstructorActions = burgerConstructorSlice.actions;
export const { getIngredientsSelector } = burgerConstructorSlice.selectors;
export default burgerConstructorSlice.reducer;
