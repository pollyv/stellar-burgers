import { BurgerConstructorUI } from '@ui';
import {
  clearIngredients,
  getIngredientsSelector
} from '../../services/constructorSlice';
import {
  clearOrderState,
  makeOrder,
  getOrder,
  getOrderRequest
} from '../../services/ordersDetailsSlice';
import { FC, useMemo } from 'react';
import { getUserData } from '../../services/userSlice';
import { TConstructorIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const userData = useSelector(getUserData);
  const navigate = useNavigate();
  const constructorItems = useSelector(getIngredientsSelector);
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrder);

  // Обработчик клика на кнопку заказа
  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!userData) {
      navigate('/login', { replace: true });
      return;
    }
    const ingredientsId = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id)
    ];
    dispatch(makeOrder(ingredientsId))
      .unwrap()
      .then(() => {
        dispatch(clearIngredients()); // Очищаем конструктор после успешного заказа
      })
      .catch((error) => {
        console.error('Не удалось оформить заказ:', error);
        // Опционально можно обработать ошибку, например, показать уведомление пользователю
      });
  };

  // Обработчик закрытия модального окна заказа
  const closeOrderModal = () => {
    dispatch(clearOrderState());
  };

  // Вычисление общей стоимости заказа
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
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
