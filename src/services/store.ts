import { constructorReducer, constructorSliceName } from './constructorSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer, ingredientsSliceName } from './ingredientsSlice';
import { feedReducer, feedSliceName } from './feedSlice';
import { orderDetailesName, orderDetailesReducer } from './orderDetailesSlice';
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
  [orderDetailesName]: orderDetailesReducer
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
