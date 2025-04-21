import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RecordItem } from '../models/recordModel';
import preloadedState from './init';

const recordSlice = createSlice({
  name: 'record',
  initialState: [] as RecordItem[],
  reducers: {
    addRecord(state, action: PayloadAction<RecordItem>) {
      state.push(action.payload);
    },
  },
});

export const { addRecord } = recordSlice.actions;

const store = configureStore({
  reducer: {
    record: recordSlice.reducer,
  },
  preloadedState
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

