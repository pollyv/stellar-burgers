import '../../index.css';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
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
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import styles from './app.module.css';
import { useEffect, useMemo } from 'react';
import { useDispatch } from '../../services/store';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.background;

  // Используем useEffect для диспатча действия getIngredients при монтировании компонента
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      {/* Определяем основные маршруты приложения */}
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<AppHeader />}>
          <Route index element={<ConstructorPage />} />
          <Route path='feed' element={<Feed />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='reset-password' element={<ResetPassword />} />
          <Route path='profile/' element={<Profile />}>
            <Route path='orders' element={<ProfileOrders />} />
          </Route>
          <Route path='*' element={<NotFound404 />} />
        </Route>
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/profile/orders/:number' element={<OrderInfo />} />
      </Routes>
      {/* Определяем маршруты для отображения в модальных окнах */}
      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title='Информация о заказе'
                onClose={() => navigate('/feed')}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={() => navigate('/')}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title='Информация о заказе'
                onClose={() => navigate('/profile/orders')}
              >
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
