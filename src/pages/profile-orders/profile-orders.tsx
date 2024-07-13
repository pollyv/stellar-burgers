import { FC, useEffect } from 'react';
import {
  getUserOrders,
  getUserOrdersList,
  getUserOrdersError
} from '../../services/ordersUserSlice';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getUserOrdersList);
  const error = useSelector(getUserOrdersError);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  return (
    <>
      {error ? ( // Если есть ошибка, отображаем сообщение об ошибке
        <p style={{ color: 'var(--colors-interface-error)' }}>error</p>
      ) : (
        // Если все ок, отображаем компонент ProfileOrdersUI с полученными заказами
        <ProfileOrdersUI orders={orders} />
      )}
    </>
  );
};
