import { authUserReducer, authUserSliceName } from './userSlice';
import { constructorReducer, constructorSliceName } from './constructorSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer, ingredientsSliceName } from './ingredientsSlice';
import { feedReducer, feedSliceName } from './feedSlice';
import { orderDetailsName, orderDetailsReducer } from './ordersDetailsSlice';
import { ordersReducer, ordersSliceName } from './ordersUserSlice';
import { ThunkAction, ThunkDispatch, thunk } from 'redux-thunk';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

// Комбинируем все редьюсеры в один корневой
const rootReducer = combineReducers({
  [ingredientsSliceName]: ingredientsReducer,
  [constructorSliceName]: constructorReducer,
  [feedSliceName]: feedReducer,
  [orderDetailsName]: orderDetailsReducer,
  [authUserSliceName]: authUserReducer,
  [ordersSliceName]: ordersReducer
});

// Хранилище Redux с указанными редьюсерами
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production' // Включаем инструменты разработчика только в режиме разработки
});

// Определяем тип для корневого состояния Redux
export type RootState = ReturnType<typeof rootReducer>;

// Определяем тип для dispatch
export type AppDispatch = typeof store.dispatch;
export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
