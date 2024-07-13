import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import {
  loginUser,
  getErrorLogin,
  getLoginUserRequest
} from '../../services/userSlice';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';

export const Login: FC = () => {
  // Локальные состояния для email и пароля
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Получение состояния ошибки и запроса на вход из Redux
  const errorText = useSelector(getErrorLogin) || undefined;
  const request = useSelector(getLoginUserRequest);

  const dispatch = useDispatch();

  // Обработка отправки формы входа
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <>
      {request ? (
        <Preloader />
      ) : (
        <LoginUI
          errorText={errorText}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};
