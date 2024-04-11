import { createSlice } from '@reduxjs/toolkit';
import {
  addContact,
  deleteContact,
  fetchContacts,
  updateContact,
} from './operations';
import { logOut } from '../auth/operations';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    loading: false,
    error: false,
  },
  
  extraReducers: builder =>
    builder
      
      .addCase(fetchContacts.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addContact.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      
      .addCase(deleteContact.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(updateContact.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const contactIndex = state.items.findIndex(
          item => item.id === action.payload.id
        );
        state.items[contactIndex] = action.payload;
        state.error = false;
        state.loading = false;
      })
      .addCase(updateContact.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(logOut.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(logOut.fulfilled, state => {
        state.items = [];
        state.error = false;
        state.loading = false;
      })
      .addCase(logOut.rejected, state => {
        state.loading = false;
        state.error = true;
      }),
});

export default contactsSlice.reducer;
