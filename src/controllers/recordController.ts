import { addRecord } from '../store';
import { RecordItem } from '../models/recordModel';

export const createRecord = (dispatch, data: Omit<RecordItem, 'id' | 'date'>) => {
  const record: RecordItem = {
    ...data,
    id: Date.now(),
    date: new Date().toLocaleDateString(),
  };
  dispatch(addRecord(record));
};

