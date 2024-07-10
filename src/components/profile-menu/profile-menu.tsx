import { FC } from 'react';
import { logoutUser } from '../../services/userSlice';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { useLocation } from 'react-router-dom';

export const ProfileMenu: FC = () => {
  // Получение текущего пути из хука useLocation
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  // Обработчик выхода из аккаунта
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
