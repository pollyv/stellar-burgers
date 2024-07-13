import { FC, useEffect } from 'react';
import { FeedUI } from '@ui-pages';
import {
  fetchFeed,
  getErrorFeed,
  getFeedOrders
} from '../../services/feedSlice';
import { Outlet } from 'react-router-dom';
import { Preloader } from '@ui';
import { TOrder } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';

// Компонент Feed
export const Feed: FC = () => {
  const dispatch = useDispatch(); // Инициализация dispatch для вызова экшенов
  const orders: TOrder[] = useSelector(getFeedOrders); // Получаем список заказов
  const ordersError = useSelector(getErrorFeed); // Получаем ошибку загрузки заказов

  useEffect(() => {
    dispatch(fetchFeed()); // Вызов экшена для получения списка заказов при монтировании компонента
  }, [dispatch]); // Добавляем dispatch в зависимости

  // Если есть ошибка загрузки заказов, отображаем сообщение об ошибке
  if (ordersError) {
    return (
      <p style={{ color: 'var(--colors-interface-error)' }}>{ordersError}</p>
    );
  }

  // Если заказы еще не загружены, отображаем прелоадер
  if (!orders.length) {
    return <Preloader />;
  }

  // Если заказы успешно загружены, отображаем компонент FeedUI
  return (
    <>
      <FeedUI
        orders={orders}
        handleGetFeeds={() => {
          dispatch(fetchFeed()); // Функция для повторного получения списка заказов
        }}
      />
      <Outlet />
    </>
  );
};
