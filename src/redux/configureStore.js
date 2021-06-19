import { configureStore } from "@reduxjs/toolkit";

import practitionerReducer from './reducers/practitioner'

const store = configureStore({
  reducer: {
    practitioner: practitionerReducer
  }
});

export default store;
