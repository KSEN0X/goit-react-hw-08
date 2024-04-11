import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice'; 
import filtersReducer from './filtersSlice';
const initialState = {
  contacts: {
    items: [],
    loading: false,
    error: null,
  },
  filters: {
    name: '',
  },
};

export const store = configureStore({
  reducer:
    {
      contacts: contactsReducer,
      filters: filtersReducer,
    },
  preloadedState: initialState,
});
