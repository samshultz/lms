import { configureStore } from "@reduxjs/toolkit";

import userReducer from './features/user';
import layoutReducer from './features/layout';
import studentReducer from './features/studentMgt.js';

const store = configureStore({
  reducer: {
    user: userReducer,
    layout: layoutReducer,
    studentMgt: studentReducer
 }
})

export default store