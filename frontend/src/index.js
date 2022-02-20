import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

import userReducer from './features/user';
import layoutReducer from './features/layout';
const store = configureStore({
  reducer: {
    user: userReducer,
    layout: layoutReducer
 }
})
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
