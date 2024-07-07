import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { Outlet } from 'react-router-dom'; // Чтобы рендерить компоненты в зависимости от текущего пути маршрута

export const AppHeader: FC = () => (
  <>
    <AppHeaderUI userName='' />
    <Outlet />
  </>
);
