import { AppHeaderUI } from '@ui';
import { FC } from 'react';
import { getUserData } from '../../services/userSlice';
import { Outlet } from 'react-router-dom'; // Чтобы рендерить компоненты в зависимости от текущего пути маршрута
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  // Получаем имя пользователя из Redux, если данные пользователя существуют
  const userName = useSelector(getUserData)?.name || '';

  return (
    <>
      <AppHeaderUI userName={userName} />
      <Outlet />
    </>
  );
};
