import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RecordItem } from '@/models/recordModel';
import preloadedState from './init';

const recSlice = createSlice({
  name: 'record',
  initialState: [] as RecordItem[],
  reducers: {
    addRecord(state, action: PayloadAction<RecordItem>) {
      state.push(action.payload);
    },

    modifyRecord(state, action: PayloadAction<RecordItem>) {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },

    deleteRecord(state, action: PayloadAction<number>) {
      const index = state.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    }

  }
});

export const { addRecord, modifyRecord, deleteRecord } = recSlice.actions;

const store = configureStore({
  reducer: {
    record: recSlice.reducer,
  },
  preloadedState
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

