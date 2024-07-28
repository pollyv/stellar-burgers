import { configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from '../ingredientsSlice';
import { authUserSlice } from '../userSlice';
import { burgerConstructorSlice } from '../constructorSlice';
import { feedSlice } from '../feedSlice';
import { handleUserOrdersSlice } from '../ordersUserSlice';
import { orderSlice } from '../ordersDetailsSlice';
import { rootReducer } from '../store';

const initialRootState = {
  [ingredientsSlice.name]: ingredientsSlice.getInitialState(),
  [authUserSlice.name]: authUserSlice.getInitialState(),
  [burgerConstructorSlice.name]: burgerConstructorSlice.getInitialState(),
  [feedSlice.name]: feedSlice.getInitialState(),
  [handleUserOrdersSlice.name]: handleUserOrdersSlice.getInitialState(),
  [orderSlice.name]: orderSlice.getInitialState()
};

describe('rootReducer', () => {
  test('должен правильно объединять состояния различных редюсеров', () => {
    // Пример действия и ожидания
    const action = { type: 'SOME_ACTION' };
    // Получаем итоговое состояние после применения действия к rootReducer
    const state = rootReducer(initialRootState, action);
    // Ожидаем, что состояние каждого slice остается прежним, так как нет обработчиков для ACTION_1
    expect(state).toEqual(initialRootState);
  });

  test('должен правильно инициализировать начальное состояние', () => {
    // Создаем store с помощью rootReducer
    const store = configureStore({ reducer: rootReducer });
    // Получаем текущее состояние store
    const state = store.getState();
    // Ожидаем, что текущее состояние совпадает с ожидаемым начальным состоянием
    expect(state).toEqual(initialRootState);
  });
});
