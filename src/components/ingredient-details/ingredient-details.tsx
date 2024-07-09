import { getIngredientsSelector } from '../../services/ingredientsSlice';
import { FC } from 'react';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Preloader } from '../ui/preloader';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';

// Функциональный компонент IngredientDetails
export const IngredientDetails: FC = () => {
  const { id } = useParams(); // Получение параметра id из URL
  const ingredientData = useSelector(getIngredientsSelector).find(
    (ingredient) => ingredient._id === id // Поиск ингредиента по id из параметра URL
  );

  // Если данные об ингредиенте не найдены, отображаем компонент Preloader
  if (!ingredientData) {
    return <Preloader />;
  }

  // Если данные об ингредиенте найдены, отображаем компонент IngredientDetailsUI с этими данными
  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
