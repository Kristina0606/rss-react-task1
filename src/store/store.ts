import { configureStore } from '@reduxjs/toolkit';
import selectCheckboxReducer from './selectCheckboxSlice';

const store = configureStore({
  reducer: {
    selectCheckbox: selectCheckboxReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
