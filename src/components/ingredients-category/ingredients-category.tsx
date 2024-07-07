import { getIngredientsSelector } from '../../services/constructorSlice';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { useSelector } from '../../services/store';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  // Получаем данные о текущих ингредиентах из конструктора бургера
  const burgerConstructor = useSelector(getIngredientsSelector);

  // Вычисляем количество каждого ингредиента в конструкторе
  const ingredientsCounters = useMemo(() => {
    const { bun, ingredients } = burgerConstructor;
    const counters: { [key: string]: number } = {};

    // Подсчитываем количество каждого ингредиента
    ingredients.forEach((ingredient: TIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });

    // Учитываем булочку отдельно (ее всегда две)
    if (bun) counters[bun._id] = 2;
    return counters;
  }, [burgerConstructor]);

  return (
    <IngredientsCategoryUI
      title={title} // Передаем заголовок категории в UI компонент
      titleRef={titleRef} // Передаем ref для заголовка категории в UI компонент
      ingredients={ingredients} // Передаем список ингредиентов в UI компонент
      ingredientsCounters={ingredientsCounters} // Передаем подсчитанные количества ингредиентов в UI компонент
      ref={ref} // Передаем ref для самой категории в UI компонент
    />
  );
});
