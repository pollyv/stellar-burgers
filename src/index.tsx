import * as ReactDOMClient from 'react-dom/client';
import App from './components/app/app';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // Импорт Provider для подключения Redux
import React from 'react';
import store from './services/store';

const container = document.getElementById('root') as HTMLElement; // Получаем корневой элемент
const root = ReactDOMClient.createRoot(container); // Создаем корень React

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* Оборачиваем приложение в BrowserRouter для работы с маршрутизацией */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
