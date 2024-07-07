import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux'; // Импорт Provider для подключения Redux
import store from './services/store';

const container = document.getElementById('root') as HTMLElement; // Получаем корневой элемент
const root = ReactDOMClient.createRoot(container); // Создаем корень React

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
