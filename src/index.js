import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';   // npm 설치 후 꼭 import 필요
import './resources/assets/css/style.css';  // src 안에 파일들 넣고 직접 import, 점도 한개
// style.css와 bootstrap.css 파일이 같은 index.js 파일에 있어야
// style.css가 먼저 적용될 수 있음!
import { Provider } from 'react-redux';
import { store } from './redux/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
