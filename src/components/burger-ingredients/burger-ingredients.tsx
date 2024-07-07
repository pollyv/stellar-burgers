import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import {
  getIngredientsSelector,
  getIngredientsErrorSelector
} from '../../services/ingredientsSlice';
import { TTabMode } from '@utils-types';
import { useInView } from 'react-intersection-observer';
import { useSelector } from '../../services/store';
import { useState, useRef, useEffect, FC } from 'react';

export const BurgerIngredients: FC = () => {
  const burgerIngredients = useSelector(getIngredientsSelector); // Получение ингредиентов бургера из состояния Redux
  const burgerIngredientsError = useSelector(getIngredientsErrorSelector); // Получение ошибки ингредиентов бургера из состояния Redux

  // Фильтрация ингредиентов по типу
  const buns = burgerIngredients.filter(
    (ingredient) => ingredient.type === 'bun'
  );
  const mains = burgerIngredients.filter(
    (ingredient) => ingredient.type === 'main'
  );
  const sauces = burgerIngredients.filter(
    (ingredient) => ingredient.type === 'sauce'
  );

  // Состояние текущей выбранной вкладки и рефы для заголовков вкладок
  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  // Хуки для определения видимости блоков ингредиентов
  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });
  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });
  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  // Эффект для обновления текущей вкладки при изменении видимости блоков
  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  // Обработчик клика по вкладке
  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    // Прокрутка к выбранному заголовку вкладки
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Вывод сообщения об ошибке, если она есть */}
      {burgerIngredientsError && (
        <p style={{ color: 'var(--colors-interface-error)' }}>
          {burgerIngredientsError}
        </p>
      )}
      {/* Отрисовка пользовательского интерфейса ингредиентов бургера */}
      <BurgerIngredientsUI
        currentTab={currentTab}
        buns={buns}
        mains={mains}
        sauces={sauces}
        titleBunRef={titleBunRef}
        titleMainRef={titleMainRef}
        titleSaucesRef={titleSaucesRef}
        bunsRef={bunsRef}
        mainsRef={mainsRef}
        saucesRef={saucesRef}
        onTabClick={onTabClick}
      />
    </>
  );
};
