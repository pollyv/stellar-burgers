import { getFeedState } from '../../services/feedSlice';
import { FC } from 'react';
import { FeedInfoUI } from '../ui/feed-info';
import { TOrder } from '@utils-types';
import { useSelector } from '../../services/store';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

// Компонент FeedInfo
export const FeedInfo: FC = () => {
  // Получаем заказы из состояния, общее кол-во заказов и кол-во за сегодня
  const { orders, total, totalToday } = useSelector(getFeedState);
  // Создаем объект с информацией о заказах
  const feed = { total, totalToday };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
