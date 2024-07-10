import { FC, SyntheticEvent, useState } from 'react';
import { Preloader } from '@ui';
import { RegisterUI } from '@ui-pages';
import {
  registerUser,
  getErrorRegistration,
  getLoginUserRequest
} from '../../services/userSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Register: FC = () => {
  // Локальные состояния для имени пользователя, email и пароля
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Получение состояния ошибки и запроса на регистрацию из Redux
  const errorText = useSelector(getErrorRegistration) || undefined;
  const request = useSelector(getLoginUserRequest);

  const dispatch = useDispatch();

  // Обработка отправки формы регистрации
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser({ name: userName, email, password }));
  };

  return (
    <>
      {request ? (
        <Preloader />
      ) : (
        <RegisterUI
          errorText={errorText}
          email={email}
          userName={userName}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          setUserName={setUserName}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};
