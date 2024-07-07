import '../../index.css';
import { AppHeader, IngredientDetails, Modal } from '@components';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { getIngredients } from '../../services/ingredientsSlice';
import styles from './app.module.css';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';

// Создание объекта роутера с определением маршрутов и их компонентов
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppHeader />, // Шапка приложения для главной страницы
    children: [
      {
        index: true,
        element: <ConstructorPage /> // Основная страница сборки бургера
      },
      {
        path: 'feed',
        element: <Feed /> // Страница с лентой заказов
      },
      {
        path: 'login',
        element: <Login /> // Страница входа
      },
      {
        path: 'register',
        element: <Register /> // Страница регистрации
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword /> // Страница восстановления пароля
      },
      {
        path: 'reset-password',
        element: <ResetPassword /> // Страница сброса пароля
      },
      {
        path: 'profile/',
        element: <Profile />, // Страница профиля пользователя
        children: [
          {
            path: 'orders',
            element: <ProfileOrders /> // Подстраница заказов пользователя
          }
        ]
      },
      {
        path: '*',
        element: <NotFound404 /> // Страница "404 Not Found" для несуществующих маршрутов
      }
    ]
  },
  {
    path: '/ingredients/:id',
    element: (
      <Modal title='Детали ингредиента' onClose={() => {}}>
        <IngredientDetails />
        {/* Детали выбранного ингредиента в модальном окне */}
      </Modal>
    )
  }
]);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients()); // Загрузка ингредиентов бургера при монтировании компонента
  }, []);

  return (
    <div className={styles.app}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
