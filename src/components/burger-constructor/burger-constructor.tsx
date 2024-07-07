import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredientsSelector } from '../../services/constructorSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const constructorItems = useSelector(getIngredientsSelector); // Получаем ингредиенты конструктора из стора
  const navigate = useNavigate();
  const orderRequest = false; // Флаг для определения состояния запроса на заказ (может быть заменен на значение из стора)

  const orderModalData = null; // Данные модального окна заказа (может быть заменен на значение из стора)

  /**
   * Обработчик клика на кнопку заказа
   * Если булочки нет или идет запрос на заказ, функция ничего не делает
   */
  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    // Здесь будет логика для оформления заказа
  };

  /**
   * Обработчик закрытия модального окна заказа
   */
  const closeOrderModal = () => {
    // Здесь будет логика для закрытия модального окна
  };

  /**
   * Вычисление общей стоимости заказа
   * Учитывается цена булочки (удвоенная) и всех ингредиентов
   */
  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price} // Общая стоимость заказа
      orderRequest={orderRequest} // Флаг состояния запроса на заказ
      constructorItems={constructorItems} // Ингредиенты конструктора
      orderModalData={orderModalData} // Данные для модального окна заказа
      onOrderClick={onOrderClick} // Обработчик клика на кнопку заказа
      closeOrderModal={closeOrderModal} // Обработчик закрытия модального окна
    />
  );
};
