import { configureStore } from '@reduxjs/toolkit';
import selectCheckboxReducer from './selectCheckboxSlice';
import { pokemonApi } from './pokemonApi';

const store = configureStore({
  reducer: {
    selectCheckbox: selectCheckboxReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
