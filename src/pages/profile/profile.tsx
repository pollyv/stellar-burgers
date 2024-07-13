import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { ProfileUI } from '@ui-pages';
import {
  updateUser,
  getErrorUpdate,
  getLoginUserRequest,
  getUserData
} from '../../services/userSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Profile: FC = () => {
  // Получение данных пользователя, состояния запроса и ошибки обновления из Redux
  const user = useSelector(getUserData);
  const request = useSelector(getLoginUserRequest);
  const errorText = useSelector(getErrorUpdate);
  const dispatch = useDispatch();

  // Локальное состояние для формы профиля
  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  // Обновление формы при изменении данных пользователя
  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  // Проверка, были ли внесены изменения в форму
  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  // Обработка отправки формы обновления профиля
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(formValue));
  };

  // Обработка отмены изменений в форме профиля
  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  // Обработка изменения значений в полях формы профиля
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
