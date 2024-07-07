import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { FC } from 'react';
import { getLoadingSelector } from '../../services/ingredientsSlice';
import { Preloader } from '../../components/ui';
import styles from './constructor-page.module.css';
import { useSelector } from '../../services/store';

export const ConstructorPage: FC = () => {
  const isIngredientsLoading = useSelector(getLoadingSelector); // Получение состояния загрузки ингредиентов из хранилища
  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
