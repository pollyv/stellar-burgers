import { getIngredientsSelector } from '../../services/ingredientsSlice';
import { FC, useMemo, useEffect } from 'react';
import { getDetailsOrder, getOrder } from '../../services/ordersDetailsSlice';
import { OrderInfoUI } from '../ui/order-info';
import { Preloader } from '../ui/preloader';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

// Функциональный компонент OrderInfo
export const OrderInfo: FC = () => {
  const { number } = useParams();
  const id = Number(number);
  const dispatch = useDispatch();

  // Используем useEffect для диспатча действия fetchDetailesOrder при монтировании компонента
  useEffect(() => {
    dispatch(getDetailsOrder(id));
  }, [dispatch, id]);

  const orderData = useSelector(getOrder); // Получение данных заказа из Redux store

  // Отфильтровываем ингредиенты, которые используются в заказе
  const ingredients: TIngredient[] = useSelector(getIngredientsSelector).filter(
    (ingredient) => orderData?.ingredients.includes(ingredient._id)
  );

  /* Готовим данные для отображения */
  // Используем useMemo для подготовки данных для отображения
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt); // Преобразование даты создания заказа

    // Тип для ингредиентов с количеством
    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    // Подсчет количества каждого ингредиента в заказе
    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {}
    );

    // Подсчет общей стоимости заказа
    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  // Если информация о заказе не готова, отображаем компонент Preloader
  if (!orderInfo) {
    return <Preloader />;
  }

  // Отображаем компонент OrderInfoUI с подготовленными данными
  return <OrderInfoUI orderInfo={orderInfo} />;
};
