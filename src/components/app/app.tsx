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
import { PageDetailsComponent } from '../../pages/page-details/page-details';
import { ProtectedRoute } from '../protected-route';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import styles from './app.module.css';
import { FC, useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { verifyUserAuth } from '../../services/userSlice';

const App: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Получаесм состояние background из location
  const backgroundLocation = location.state?.background;

  // useEffect для выполнения начальной загрузки данных
  useEffect(() => {
    dispatch(getIngredients());
    dispatch(verifyUserAuth());
  }, [dispatch]);

  // Основная разметка с маршрутизацией
  return (
    <div className={styles.app}>
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<AppHeader />}>
          <Route index element={<ConstructorPage />} />
          <Route path='feed' element={<Feed />} />
          <Route
            path='login'
            element={
              <ProtectedRoute onlyUnAuth>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='register'
            element={
              <ProtectedRoute onlyUnAuth>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='forgot-password'
            element={
              <ProtectedRoute onlyUnAuth>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='reset-password'
            element={
              <ProtectedRoute onlyUnAuth>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='profile/'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='profile/orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<NotFound404 />} />
          <Route
            path='/feed/:number'
            element={
              <PageDetailsComponent title='Детали заказа'>
                <OrderInfo />
              </PageDetailsComponent>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <PageDetailsComponent title='Детали ингридиента'>
                <IngredientDetails />
              </PageDetailsComponent>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <PageDetailsComponent title='Детали заказа'>
                  <OrderInfo />
                </PageDetailsComponent>
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
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
              <ProtectedRoute>
                <Modal
                  title='Информация о заказе'
                  onClose={() => navigate('/profile/orders')}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};
export default App;
